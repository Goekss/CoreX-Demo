import { useEffect, useState, useCallback, useMemo } from 'react';
import { Alert, Button, Container, Form, Modal, Badge } from 'react-bootstrap';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import DataTable from '../components/shared/DataTable';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import ConfirmDialog from '../components/shared/ConfirmDialog';
import { zahlungApi } from '../api/zahlungApi';
import { useLanguage } from '../hooks/useLanguage';
import { ApiError } from '../api/errorHandler';
import { usePermission } from '../hooks/usePermission';
import '../styles/Zahlung.css';

const statusColors = {
  Ausstehend: 'warning',
  Bezahlt: 'success',
  Fehlgeschlagen: 'danger',
  Erstattet: 'info',
  Storniert: 'secondary',
};

const statusOptions = ['Ausstehend', 'Bezahlt', 'Fehlgeschlagen', 'Erstattet', 'Storniert'];
const chartColors = ['#0ea5e9', '#14b8a6', '#f59e0b', '#ef4444', '#64748b'];
const localeByLanguage = { en: 'en-US', de: 'de-DE', fr: 'fr-FR', it: 'it-IT' };

export default function Zahlung() {
  const { t, language } = useLanguage();
  const { canCreate } = usePermission();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const size = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await zahlungApi.getAll(page, size);
      setData(res.data?.items || res.data || []);
      setTotal(res.data?.totalCount || 0);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Zahlungen konnten nicht geladen werden.');
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  const analytics = useMemo(() => {
    const paid = data.filter((item) => item.status === 'Bezahlt');
    const pending = data.filter((item) => item.status === 'Ausstehend');
    const overdue = data.filter((item) => ['Überfällig', 'Fehlgeschlagen'].includes(item.status));
    const sum = (items) => items.reduce((totalAmount, item) => totalAmount + Number(item.betrag || 0), 0);

    const monthly = Object.values(data.reduce((groups, item) => {
      const date = new Date(item.datum || item.zahlungsdatum);
      if (Number.isNaN(date.getTime())) return groups;
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      groups[key] ||= { key, amount: 0, date };
      groups[key].amount += Number(item.betrag || 0);
      return groups;
    }, {})).sort((a, b) => a.key.localeCompare(b.key)).map((item) => ({
      name: new Intl.DateTimeFormat(localeByLanguage[language], { month: 'short' }).format(item.date),
      amount: item.amount,
    }));

    const groupCount = (field, fallback) => Object.entries(data.reduce((groups, item) => {
      const key = item[field] || fallback;
      groups[key] = (groups[key] || 0) + 1;
      return groups;
    }, {})).map(([name, value]) => ({ name, value }));

    return {
      paidAmount: sum(paid), pendingAmount: sum(pending), overdueAmount: sum(overdue),
      paidCount: paid.length, pendingCount: pending.length, overdueCount: overdue.length,
      monthly, statuses: groupCount('status', '—'), methods: groupCount('zahlungsmethode', 'SEPA'),
    };
  }, [data, language]);

  const currency = (value) => new Intl.NumberFormat(localeByLanguage[language], {
    style: 'currency', currency: 'EUR', maximumFractionDigits: 0,
  }).format(value);

  const handleSave = async (formData) => {
    setError('');
    try {
      await zahlungApi.create(formData);
      setShowModal(false);
      load();
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Speichern fehlgeschlagen.');
      }
    }
  };

  const columns = [
    { key: 'rechnungsNr', label: 'Rechnungs-Nr.', render: (r) => r.rechnungsNr || r.rechnungsnummer || '—' },
    { key: 'betrag', label: 'Betrag', render: (r) => r.betrag != null ? `€${r.betrag.toFixed(2)}` : '—' },
    {
      key: 'status', label: 'Status',
      render: (r) => (
        <Badge bg={statusColors[r.status] || 'secondary'}>{r.status}</Badge>
      ),
    },
    { key: 'datum', label: 'Datum', render: (r) => (r.datum || r.zahlungsdatum)?.slice(0, 10) || '—' },
    {
      key: 'kundeName', label: 'Kunde',
      render: (r) => (
        <div className="payment-customer">
          {r.kundeLogo ? <img src={r.kundeLogo} alt="" /> : <i className="bi bi-building" />}
          <span>{r.kundeName || '—'}</span>
        </div>
      ),
    },
  ];

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><i className="bi bi-wallet2 me-2" />{t('payments.title')}</h2>
        {canCreate && (
          <Button className="rounded-3" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-1" /> {t('payments.newPayment')}
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <LoadingSpinner text="Zahlungen werden geladen..." />
      ) : (
        <>
          <section className="payment-summary-row mb-4">
            <div className="payment-table-wrap">
              <DataTable columns={columns} data={data} totalCount={total}
                page={page} size={size} onPageChange={setPage} />
            </div>
            <div className="payment-kpi-stack">
              {[
                { title: t('payments.totalCollected'), value: analytics.paidAmount, count: analytics.paidCount, icon: 'bi-check-circle-fill', tone: 'success' },
                { title: t('payments.outstanding'), value: analytics.pendingAmount, count: analytics.pendingCount, icon: 'bi-hourglass-split', tone: 'warning' },
                { title: t('payments.overdue'), value: analytics.overdueAmount, count: analytics.overdueCount, icon: 'bi-exclamation-triangle-fill', tone: 'danger' },
              ].map((item) => (
                <article className={`payment-kpi payment-kpi-${item.tone}`} key={item.title}>
                  <div className="payment-kpi-icon"><i className={`bi ${item.icon}`} /></div>
                  <div>
                    <span>{item.title}</span>
                    <strong>{currency(item.value)}</strong>
                    <small>{item.count} {t('payments.transactions')}</small>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="payment-insights mb-4">
          <article className="payment-chart-card">
            <h3><i className="bi bi-graph-up-arrow" />{t('payments.revenueTrend')}</h3>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={analytics.monthly} margin={{ top: 12, right: 12, left: -14, bottom: 0 }}>
                <defs><linearGradient id="paymentArea" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.35} /><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" /><YAxis tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip formatter={(value) => currency(value)} />
                <Area type="monotone" dataKey="amount" stroke="#0ea5e9" strokeWidth={3} fill="url(#paymentArea)" />
              </AreaChart>
            </ResponsiveContainer>
          </article>

          <article className="payment-chart-card">
            <h3><i className="bi bi-pie-chart-fill" />{t('payments.statusDistribution')}</h3>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart><Pie data={analytics.statuses} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76} paddingAngle={3} label>{analytics.statuses.map((entry, index) => <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />)}</Pie><Tooltip /></PieChart>
            </ResponsiveContainer>
          </article>

          <article className="payment-chart-card">
            <h3><i className="bi bi-credit-card-fill" />{t('payments.paymentMethods')}</h3>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={analytics.methods} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip />
                <Bar dataKey="value" fill="#14b8a6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </article>
          </section>
        </>
      )}

      <ZahlungModal
        show={showModal}
        onHide={() => { setShowModal(false); setError(''); }}
        onSave={handleSave}
        error={error}
      />
    </Container>
  );
}

function ZahlungModal({ show, onHide, onSave, error }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    rechnungsnummer: '', betrag: '', zahlungsdatum: '',
    zahlungsmethode: '', status: 'Ausstehend',
  });

  useEffect(() => {
    if (show) {
      setForm({ rechnungsnummer: '', betrag: '', zahlungsdatum: '',
        zahlungsmethode: '', status: 'Ausstehend' });
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      betrag: form.betrag !== '' ? parseFloat(form.betrag) : null,
      zahlungsdatum: form.zahlungsdatum || null,
    };
    onSave(payload);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Neue Zahlung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="row g-3">
            <div className="col-md-6">
              <Form.Label>Rechnungs-Nr. *</Form.Label>
              <Form.Control required value={form.rechnungsnummer}
                onChange={(e) => setForm({ ...form, rechnungsnummer: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Betrag (€) *</Form.Label>
              <Form.Control type="number" step="0.01" min="0" required value={form.betrag}
                onChange={(e) => setForm({ ...form, betrag: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Datum</Form.Label>
              <Form.Control type="date" value={form.zahlungsdatum}
                onChange={(e) => setForm({ ...form, zahlungsdatum: e.target.value })} />
            </div>
            <div className="col-md-6">
              <Form.Label>Methode</Form.Label>
              <Form.Select value={form.zahlungsmethode}
                onChange={(e) => setForm({ ...form, zahlungsmethode: e.target.value })}>
                <option value="">Bitte auswählen...</option>
                <option value="Überweisung">Überweisung</option>
                <option value="Kreditkarte">Kreditkarte</option>
                <option value="SEPA">SEPA</option>
                <option value="PayPal">PayPal</option>
                <option value="Bar">Bar</option>
              </Form.Select>
            </div>
            <div className="col-md-6">
              <Form.Label>Status</Form.Label>
              <Form.Select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {statusOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </Form.Select>
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
