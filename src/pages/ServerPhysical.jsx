import { useEffect, useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import '../styles/ServerPhysical.css';

const servers = [
  { id: 'srv01', name: 'DE-MUC-SRV-01', model: 'Dell PowerEdge R750', location: 'München · Rack A3', cpu: '2 × Intel Xeon Gold', ram: '256 GB', usedTb: 5.8, totalTb: 8, usage: 73, ip: '10.10.1.21', dns: 'srv01.vista-core.local', workloads: ['SQL Server', 'CRM API', 'Backup Agent'] },
  { id: 'srv02', name: 'DE-BER-SRV-02', model: 'HPE ProLiant DL380', location: 'Berlin · Rack B1', cpu: '2 × AMD EPYC 7313', ram: '192 GB', usedTb: 3.1, totalTb: 6, usage: 52, ip: '10.20.1.18', dns: 'srv02.vista-core.local', workloads: ['Docker Host', 'GitHub Runner', 'Redis'] },
  { id: 'srv03', name: 'DE-HAM-SRV-03', model: 'Lenovo ThinkSystem SR650', location: 'Hamburg · Rack C2', cpu: '2 × Intel Xeon Silver', ram: '128 GB', usedTb: 3.4, totalTb: 4, usage: 86, ip: '10.30.1.14', dns: 'srv03.vista-core.local', workloads: ['File Server', 'Monitoring', 'VPN Gateway'] },
];

function AnimatedUsage({ target }) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    let startValue = target;
    let animationFrame;
    let startTime;

    setValue((current) => {
      startValue = current;
      return current;
    });

    const animate = (time) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / 1600, 1);
      setValue(Math.round(startValue + (target - startValue) * progress));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  return value;
}

export default function ServerPhysical() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedServer, setSelectedServer] = useState('srv01');
  const [serverOnline, setServerOnline] = useState(() => Object.fromEntries(servers.map((server) => [server.id, true])));
  const userName = `${user?.vorname || ''} ${user?.nachname || ''}`.trim() || user?.email || 'Vista.Core Admin';

  return (
    <div className="container-fluid py-4 physical-page">
      <header className="physical-page-header mb-4">
        <div className="physical-page-heading">
          <div className="physical-page-icon"><i className="bi bi-server" /></div>
          <div>
            <h1>{t('serverPhysical.title')}</h1>
            <p>{t('serverPhysical.subtitle')}</p>
          </div>
        </div>
        <div className="physical-environment-status">
          <span className="physical-status-dot" />
          <div><strong>{t('serverPhysical.operational')}</strong><small>{t('serverPhysical.environment')}</small></div>
        </div>
      </header>

      <div className="physical-server-grid">
        {servers.map((server) => {
          const isSelected = selectedServer === server.id;
          const isOnline = serverOnline[server.id];
          const usageLevel = server.usage > 80 ? 'critical' : server.usage >= 60 ? 'warning' : 'normal';
          return (
            <article className={`physical-server-card${isSelected ? ' selected' : ''}${isOnline ? '' : ' offline'}`} key={server.id}>
              <div className="physical-server-top">
                <div className="physical-server-mark"><i className="bi bi-hdd-rack-fill" /></div>
                <div className="physical-server-power">
                  <span className={`physical-server-state${isOnline ? '' : ' offline'}`}>
                    <i className={`bi ${isOnline ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} />
                    {t(isOnline ? 'serverPhysical.online' : 'serverPhysical.offline')}
                  </span>
                  <button type="button" onClick={() => setServerOnline((current) => ({ ...current, [server.id]: !isOnline }))}>
                    <i className="bi bi-power" />
                    {t(isOnline ? 'serverPhysical.turnOff' : 'serverPhysical.turnOn')}
                  </button>
                </div>
              </div>
              <h2>{server.name}</h2>
              <p className="physical-server-model">{server.model}</p>
              <div className="physical-server-meta">
                <span><i className="bi bi-geo-alt" />{server.location}</span>
              </div>
              <div className="physical-hardware-grid">
                <div><i className="bi bi-cpu" /><span><small>CPU</small><strong>{server.cpu}</strong></span></div>
                <div><i className="bi bi-memory" /><span><small>RAM</small><strong>{server.ram}</strong></span></div>
              </div>
              <div className="physical-capacity">
                <div className="physical-capacity-label"><span>{t('serverPhysical.storage')}</span><strong>{server.usedTb} / {server.totalTb} TB</strong></div>
                <div className="physical-progress" role="progressbar" aria-valuenow={isOnline ? server.usage : 0} aria-valuemin="0" aria-valuemax="100">
                  <span style={{ clipPath: `inset(0 ${100 - (isOnline ? server.usage : 0)}% 0 0)` }} />
                </div>
                <small className={`physical-usage-value ${usageLevel}`}>
                  {isOnline && usageLevel !== 'normal' && <i className="bi bi-exclamation-triangle-fill" />}
                  <AnimatedUsage target={isOnline ? server.usage : 0} />% {t('serverPhysical.used')}
                </small>
              </div>
              <div className="physical-connection-details">
                <div><i className="bi bi-ethernet" /><span><small>IP</small><strong>{server.ip}</strong></span></div>
                <div><i className="bi bi-diagram-2" /><span><small>DNS</small><strong>{server.dns}</strong></span></div>
                <div><i className="bi bi-person-check" /><span><small>{t('serverPhysical.managedBy')}</small><strong>{userName}</strong></span></div>
              </div>
              <div className="physical-workload-list">
                <h3>{t('serverPhysical.workloads')}</h3>
                {server.workloads.map((workload) => <span key={workload}>{workload}</span>)}
              </div>
              <div className="physical-server-actions">
                <button type="button" className="physical-server-button" onClick={() => setSelectedServer(server.id)} disabled={isSelected}>
                  <i className={`bi ${isSelected ? 'bi-check2' : 'bi-arrow-right-circle'}`} />
                  {t(isSelected ? 'serverPhysical.selected' : 'serverPhysical.select')}
                </button>
                <button type="button" className="physical-server-open" title={t('serverPhysical.openServer')}>
                  <i className="bi bi-gear-fill" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
