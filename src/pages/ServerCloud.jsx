import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import '../styles/ServerCloud.css';

const providers = [
  { id: 'azure', name: 'Microsoft Azure', logo: 'https://api.iconify.design/logos:microsoft-azure.svg', region: 'West Europe', resources: 8, services: ['App Service', 'Azure SQL', 'Key Vault'], usedTb: 3.6, totalTb: 5, usage: 72, ip: '10.24.18.42', dns: 'azure.vista-core.internal' },
  { id: 'aws', name: 'Amazon Web Services', logo: 'https://api.iconify.design/logos:aws.svg', region: 'eu-central-1', resources: 5, services: ['EC2', 'S3', 'RDS'], usedTb: 1.8, totalTb: 4, usage: 45, ip: '10.31.7.16', dns: 'aws.vista-core.internal' },
  { id: 'gcp', name: 'Google Cloud', logo: 'https://api.iconify.design/logos:google-cloud.svg', region: 'europe-west3', resources: 4, services: ['Compute Engine', 'Cloud Storage', 'BigQuery'], usedTb: 1.9, totalTb: 3, usage: 63, ip: '10.42.12.28', dns: 'gcp.vista-core.internal' },
];

export default function ServerCloud() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState('azure');
  const userName = `${user?.vorname || ''} ${user?.nachname || ''}`.trim() || user?.email || 'Vista.Core Admin';

  return (
    <div className="container-fluid py-4 cloud-page">
      <header className="cloud-page-header mb-4">
        <div className="cloud-page-heading">
          <div className="cloud-page-icon"><i className="bi bi-cloud-check-fill" /></div>
        <div>
            <h1>{t('serverCloud.title')}</h1>
            <p>{t('serverCloud.subtitle')}</p>
          </div>
        </div>
        <div className="cloud-environment-status">
          <span className="cloud-status-dot" />
          <div><strong>{t('serverCloud.operational')}</strong><small>{t('serverCloud.environment')}</small></div>
        </div>
      </header>

      <div className="cloud-provider-grid">
        {providers.map((provider) => {
          const isSelected = selectedProvider === provider.id;
          return (
            <article className={`cloud-provider-card cloud-provider-${provider.id}${isSelected ? ' selected' : ''}`} key={provider.id}>
              <div className="cloud-provider-top">
                <div className="cloud-provider-mark"><img src={provider.logo} alt={`${provider.name} logo`} /></div>
                <span className="cloud-provider-state"><i className="bi bi-check-circle-fill" />{t('serverCloud.connected')}</span>
              </div>
              <h2>{provider.name}</h2>
              <div className="cloud-provider-meta">
                <span><i className="bi bi-geo-alt" />{provider.region}</span>
                <span><i className="bi bi-boxes" />{provider.resources} {t('serverCloud.resources')}</span>
              </div>
              <div className="cloud-capacity">
                <div className="cloud-capacity-label">
                  <span>{t('serverCloud.storage')}</span>
                  <strong>{provider.usedTb} / {provider.totalTb} TB</strong>
                </div>
                <div className="cloud-progress" role="progressbar" aria-valuenow={provider.usage} aria-valuemin="0" aria-valuemax="100">
                  <span style={{ width: `${provider.usage}%` }} />
                </div>
                <small>{provider.usage}% {t('serverCloud.used')}</small>
              </div>
              <div className="cloud-connection-details">
                <div><i className="bi bi-hdd-network" /><span><small>IP</small><strong>{provider.ip}</strong></span></div>
                <div><i className="bi bi-diagram-2" /><span><small>DNS</small><strong>{provider.dns}</strong></span></div>
                <div><i className="bi bi-person-check" /><span><small>{t('serverCloud.managedBy')}</small><strong>{userName}</strong></span></div>
              </div>
              <div className="cloud-service-list">
                <h3>{t('serverCloud.services')}</h3>
                {provider.services.map((service) => <span key={service}>{service}</span>)}
              </div>
              <button type="button" className="cloud-provider-button" onClick={() => setSelectedProvider(provider.id)} disabled={isSelected}>
                <i className={`bi ${isSelected ? 'bi-check2' : 'bi-arrow-right-circle'}`} />
                {t(isSelected ? 'serverCloud.selected' : 'serverCloud.select')}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
