import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { getAvatarUrl } from '../../api/axiosClient';
import { hasRole } from '../../hooks/usePermission';

// Rol bazlı renk — SuperAdmin/Admin: kırmızı, Manager: mavi, Standard/NurLesen: yeşil
const rolleColor = (rolle) => {
  if (!rolle) return 'var(--bs-secondary)';
  if (['SuperAdmin', 'Admin'].includes(rolle)) return '#dc3545';
  if (rolle === 'Manager') return '#0d6efd';
  return '#198754'; // Standard, NurLesen
};

const navGroups = [
  {
    items: [
      { to: '/', labelKey: 'sidebar.dashboard', icon: 'bi-house-door-fill', end: true },
    ],
  },
  {
    items: [
      { to: '/kunden',   labelKey: 'sidebar.kunden',   icon: 'bi-people-fill' },
      { to: '/projekte', labelKey: 'sidebar.projekte',  icon: 'bi-kanban-fill' },
      { to: '/tickets',  labelKey: 'sidebar.tickets',   icon: 'bi-ticket-detailed-fill' },
    ],
  },
  {
    items: [
      { to: '/benutzer', labelKey: 'sidebar.benutzer', icon: 'bi-person-gear', allowedRoles: ['SuperAdmin', 'Admin', 'Manager'] },
      { to: '/berichte', labelKey: 'sidebar.berichte', icon: 'bi-file-earmark-bar-graph-fill' },
      { to: '/chat',     labelKey: 'sidebar.chat',     icon: 'bi-chat-dots-fill' },
    ],
  },
  {
    accordion: {
      key: 'serverCenter',
      labelKey: 'sidebar.serverCloud',
      icon: 'bi-hdd-network-fill',
      items: [
        { to: '/server-cloud', labelKey: 'sidebar.cloud', icon: 'bi-cloud-fill' },
        { to: '/server-physical', labelKey: 'sidebar.physicalServer', icon: 'bi-pc-display-horizontal' },
      ],
    },
  },
  {
    accordion: {
      key: 'billing',
      labelKey: 'sidebar.aboZahlung',
      icon: 'bi-credit-card',
      allowedRoles: ['SuperAdmin', 'Admin'],
      items: [
        { to: '/abonnement', labelKey: 'sidebar.abonnement', icon: 'bi-credit-card-2-front' },
        { to: '/zahlung', labelKey: 'sidebar.zahlung', icon: 'bi-wallet2' },
      ],
    },
  },
];

export default function Sidebar({ collapsed = false, onNavigate }) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [avatarError, setAvatarError] = useState(false); // img yüklenemezse fallback
  const [openAccordions, setOpenAccordions] = useState({});
  const userRolle = user?.rolle ?? '';

  const avatarUrl = getAvatarUrl(user?.bild);
  const showImg = avatarUrl && !avatarError; // img varsa ve hata yoksa göster

  return (
    <aside className={`app-sidebar d-flex flex-column h-100${collapsed ? ' collapsed' : ''}`}>

      {/* Brand */}
      <div className="app-sidebar-brand px-4 py-5 border-bottom border-light-subtle d-flex justify-content-center">
        <img
          src={`${import.meta.env.BASE_URL}demo-assets/persons/SidebarSymbol1.png`}
          alt="Vista.CoreX"
          className="app-sidebar-logo"
        />
      </div>

      {/* Nav */}
      <nav className="p-2 flex-grow-1 mt-5 overflow-auto"> {/* mt-5: ögeleri biraz aşağıya aldık */}
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-0' : ''}> {/* mt-0: grup arası boşluğu kaldırdık */}
            {group.items ? (
              <ul className="nav nav-pills flex-column " style={{ gap: '1px' }}> {/* gap:1px ile dikey aralığı küçülttük */}
                {group.items
                  .filter(item => !item.allowedRoles || hasRole(userRolle, item.allowedRoles)) // rol kısıtı yoksa veya rolle uyuyorsa göster
                  .map((item) => {
                    const label = t(item.labelKey);
                    return (
                      <li className="nav-item" key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          onClick={onNavigate}
                          title={collapsed ? label : undefined}
                          className={({ isActive }) =>
                            `nav-link d-flex align-items-center gap-2 sidebar-link${isActive ? ' active' : ''}`
                          }
                        >
                          <i className={`bi ${item.icon} sidebar-link-icon`} />
                          <span className="sidebar-link-label">{label}</span>
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            ) : null}

            {group.accordion && (!group.accordion.allowedRoles || hasRole(userRolle, group.accordion.allowedRoles)) ? (() => {
              const accordionKey = group.accordion.key || `accordion-${gi}`;
              const isOpen = Boolean(openAccordions[accordionKey]);

              return (
                <div className="sidebar-accordion">
                  <button
                    type="button"
                    className={`sidebar-accordion-toggle nav-link d-flex align-items-center gap-2 sidebar-link${isOpen ? ' open' : ''}`}
                    onClick={() => setOpenAccordions((prev) => ({ ...prev, [accordionKey]: !isOpen }))}
                    title={collapsed ? t(group.accordion.labelKey) : undefined}
                    aria-expanded={isOpen}
                  >
                    <i className={`bi ${group.accordion.icon} sidebar-link-icon`} />
                    <span className="sidebar-link-label">{t(group.accordion.labelKey)}</span>
                    <i className={`bi bi-chevron-down ms-auto sidebar-accordion-chevron${isOpen ? ' open' : ''}`} />
                  </button>

                  <div className={`sidebar-accordion-panel${isOpen && !collapsed ? ' open' : ''}`}>
                    <ul className="nav nav-pills flex-column sidebar-accordion-children" style={{ gap: '1px' }}>
                      {group.accordion.items.map((item) => {
                        const label = t(item.labelKey);
                        return (
                          <li className="nav-item" key={item.to}>
                            <NavLink
                              to={item.to}
                              onClick={onNavigate}
                              title={collapsed ? label : undefined}
                              className={({ isActive }) =>
                                `nav-link d-flex align-items-center gap-2 sidebar-link${isActive ? ' active' : ''}`
                              }
                            >
                              <i className={`bi ${item.icon} sidebar-link-icon`} />
                              <span className="sidebar-link-label">{label}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })() : null}
          </div>
        ))}
      </nav>

      {/* Footer — kullanıcı bilgisi */}
      <div className="app-sidebar-footer px-3 py-3 border-top border-light-subtle d-flex align-items-center gap-2">
        {showImg ? (
          // Kullanıcıya ait resim varsa göster, avatar icon'u gizle
          <img
            src={avatarUrl}
            alt="avatar"
            onError={() => setAvatarError(true)}
            style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          // Resim yoksa veya yüklenemezse fallback icon göster
          <div
            className="d-flex align-items-center justify-content-center bg-secondary-subtle flex-shrink-0"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          >
            <i className="bi bi-person-fill text-secondary" style={{ fontSize: '14px' }} />
          </div>
        )}
        <div className="sidebar-footer-info overflow-hidden">
          <div className="sidebar-link-label fw-semibold text-truncate" style={{ fontSize: '0.78rem' }}>
            {user?.vorname} {user?.nachname}
          </div>
          <div className="sidebar-link-label fw-bold text-truncate" style={{ fontSize: '0.7rem', color: rolleColor(user?.rolle) }}>
            {user?.rolle || t('sidebar.footer')}
          </div>
        </div>
      </div>

    </aside>
  );
}
