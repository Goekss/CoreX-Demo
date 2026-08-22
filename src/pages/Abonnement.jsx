import { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, Button, Container, Form, Modal, Badge } from 'react-bootstrap';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import DataTable from '../components/shared/DataTable';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { abonnementApi } from '../api/abonnementApi';
import { useLanguage } from '../hooks/useLanguage';
import { ApiError } from '../api/errorHandler';
import { usePermission } from '../hooks/usePermission';
import '../styles/Abonnement.css';

const statusColors = {
  Aktiv: 'success',
  'Gekündigt': 'danger',
  Gekuendigt: 'danger',
  Pausiert: 'warning',
  Testphase: 'info',
};

const localeByLanguage = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', it: 'it-IT' };

export default function Abonnement() {
  const { t, language } = useLanguage();
  const { canEdit, canDelete, canCreate } = usePermission();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const size = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await abonnementApi.getAll(page, size);
      setData(res.data?.items || res.data || []);
      setTotal(res.data?.totalCount || 0);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Abonnements konnten nicht geladen werden.');
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const analytics = useMemo(() => {
    const active = data.filter((item) => item.status === 'Aktiv');
    const canceled = data.filter((item) => ['Gekündigt', 'Gekuendigt'].includes(item.status));
    const monthlyRevenue = Object.values(data.reduce((groups, item) => {
      const date = new Date(item.startDatum || item.startdatum);
      if (Number.isNaN(date.getTime())) return groups;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      groups[key] ||= { key, date, revenue: 0 };
      groups[key].revenue += Number(item.preis || 0);
      return groups;
    }, {})).sort((a, b) => a.key.localeCompare(b.key)).map((item) => ({
      month: new Intl.DateTimeFormat(localeByLanguage[language], { month: 'short' }).format(item.date),
      revenue: item.revenue,
    }));

    return {
      active: active.length,
      mrr: active.reduce((sum, item) => sum + Number(item.preis || 0), 0),
      canceled: canceled.length,
      monthlyRevenue,
    };
  }, [data, language]);

  const currency = (value) => new Intl.NumberFormat(localeByLanguage[language], {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(value);

  const handleSave = async (formData) => {
    setError('');
    try {
      if (editItem) {
        await abonnementApi.update(editItem.id, formData);
      } else {
        await abonnementApi.create(formData);
      }
      setShowModal(false);
      setEditItem(null);
      load();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Speichern fehlgeschlagen.');
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await abonnementApi.delete(deleteId);
      setDeleteId(null);
      load();
    } catch { /* ignore */ }
  };

  const columns = [
    {
      key: 'kundeName', label: t('subscriptions.customer'),
      render: (r) => (
        <div className="subscription-customer">
          {r.kundeLogo ? <img src={r.kundeLogo} alt="" /> : <i className="bi bi-building" />}
          <span>{r.kundeName || '—'}</span>
        </div>
      ),
    },
    { key: 'plan', label: t('subscriptions.plan') },
    {
      key: 'status', label: t('subscriptions.status'),
      render: (r) => (
        <Badge bg={statusColors[r.status] || 'secondary'}>{r.status}</Badge>
      ),
    },
    { key: 'startDatum', label: t('subscriptions.start'), render: (r) => (r.startDatum || r.startdatum)?.slice(0, 10) || '—' },
    { key: 'endDatum', label: t('subscriptions.end'), render: (r) => (r.endDatum || r.enddatum)?.slice(0, 10) || '—' },
    { key: 'preis', label: t('subscriptions.price'), render: (r) => r.preis != null ? `€${r.preis.toFixed(2)}` : '—' },
    {
      key: 'actions', label: t('common.actions'),
      render: (row) => (
        <div className="d-flex gap-1 justify-content-center align-items-center">
          {canEdit && (
            <Button className="border-0 bg-transparent" variant="outline-primary"
              onClick={() => { setEditItem(row); setShowModal(true); }}>
              <i className="bi bi-pencil-square" />
            </Button>
          )}
          {canDelete && (
            <Button className="border-0 bg-transparent" variant="outline-danger"
              onClick={() => setDeleteId(row.id)}>
              <i className="bi bi-trash" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><i className="bi bi-credit-card me-2" />{t('subscriptions.title')}</h2>
        {canCreate && (
          <Button className="rounded-3" onClick={() => { setEditItem(null); setShowModal(true); }}>
            <i className="bi bi-plus-lg me-1" /> {t('subscriptions.newSubscription')}
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner text="Abonnements werden geladen..." />
      ) : (
        <>
          <section className="subscription-details mb-4">
            <article className="subscription-chart-card">
              <h3><i className="bi bi-graph-up-arrow" />{t('subscriptions.revenueTrend')}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analytics.monthlyRevenue} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `€${value}`} />
                  <Tooltip formatter={(value) => currency(value)} />
                  <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </article>
            <div className="subscription-table-wrap">
              <DataTable columns={columns} data={data} totalCount={total}
                page={page} size={size} onPageChange={setPage} />
            </div>
          </section>

          <section className="subscription-kpis mb-4">
            <article className="subscription-kpi subscription-kpi-active">
              <i className="bi bi-check-circle-fill" />
              <div><span>{t('subscriptions.active')}</span><strong>{analytics.active}</strong></div>
            </article>
            <article className="subscription-kpi subscription-kpi-mrr">
              <i className="bi bi-arrow-repeat" />
              <div><span>{t('subscriptions.mrr')}</span><strong>{currency(analytics.mrr)}</strong></div>
            </article>
            <article className="subscription-kpi subscription-kpi-canceled">
              <i className="bi bi-x-circle-fill" />
              <div><span>{t('subscriptions.canceled')}</span><strong>{analytics.canceled}</strong></div>
            </article>
          </section>
        </>
      )}

      <AbonnementModal
        show={showModal}
        onHide={() => { setShowModal(false); setEditItem(null); setError(''); }}
        onSave={handleSave}
        initial={editItem}
        error={error}
      />

      <ConfirmDialog
        show={!!deleteId}
        title="Abonnement löschen"
        message="Möchten Sie dieses Abonnement wirklich löschen?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </Container>
  );
}

function AbonnementModal({ show, onHide, onSave, initial, error }) {
  const { t } = useLanguage();
  const [plaene, setPlaene] = useState([]);
  const [form, setForm] = useState({
    planName: '', status: 'Aktiv', startdatum: '', enddatum: '', preis: '',
  });

  useEffect(() => {
    if (show) {
      abonnementApi.getPlaene()
        .then((res) => setPlaene(res.data || []))
        .catch(() => {});
    }
  }, [show]);

  useEffect(() => {
    if (initial) {
      setForm({
        planName: initial.planName || '',
        status: initial.status || 'Aktiv',
        startdatum: initial.startdatum?.slice(0, 10) || '',
        enddatum: initial.enddatum?.slice(0, 10) || '',
        preis: initial.preis ?? '',
      });
    } else {
      setForm({ planName: '', status: 'Aktiv', startdatum: '', enddatum: '', preis: '' });
    }
  }, [initial, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      preis: form.preis !== '' ? parseFloat(form.preis) : null,
      startdatum: form.startdatum || null,
      enddatum: form.enddatum || null,
    };
    onSave(payload);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{initial ? 'Abonnement bearbeiten' : 'Neues Abonnement'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="row g-3">
            <div className="col-12">
              <Form.Label>Plan *</Form.Label>
              {plaene.length > 0 ? (
                <Form.Select required value={form.planName}
                  onChange={(e) => setForm({ ...form, planName: e.target.value })}>
                  <option value="">Bitte auswählen...</option>
                  {plaene.map((p, i) => (
                    <option key={i} value={p.name || p}>{p.name || p}</option>
                  ))}
                </Form.Select>
              ) : (
                <Form.Control required value={form.planName} placeholder="z.B. Basic, Pro, Enterprise"
                  onChange={(e) => setForm({ ...form, planName: e.target.value })} />
              )}
            </div>
            <div className="col-md-6">
              <Form.Label>Status</Form.Label>
              <Form.Select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Aktiv">Aktiv</option>
                <option value="Testphase">Testphase</option>
                <option value="Pausiert">Pausiert</option>
                <option value="Gekuendigt">Gekündigt</option>
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label>Preis (€)</Form.Label>
              <Form.Control type="number" step="0.01" min="0" value={form.preis}
                onChange={(e) => setForm({ ...form, preis: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Startdatum</Form.Label>
              <Form.Control type="date" value={form.startdatum}
                onChange={(e) => setForm({ ...form, startdatum: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Enddatum</Form.Label>
              <Form.Control type="date" value={form.enddatum}
                onChange={(e) => setForm({ ...form, enddatum: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded-2" onClick={onHide}>{t('common.cancel')}</Button>
          <Button type="submit" variant="primary" className="rounded-2">{t('common.save')}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
