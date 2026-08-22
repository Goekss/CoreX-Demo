// =============================================
// VISTA COREX — MOCK DATA (Demo)
// =============================================

export const mockUser = {
  id: 'usr-001',
  vorname: 'Max',
  nachname: 'Mustermann',
  email: 'admin@vista-corex.de',
  rolle: 'Admin',
  rollen: ['Admin', 'Projektleiter'],
  mandantId: 'mand-001',
  MandantId: 'mand-001',
  rufNummer: '+49 170 1234567',
  bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg'),
  istAktiv: true,
};

export const mockBenutzer = [
  { id: 'usr-001', vorname: 'Max', nachname: 'Mustermann', email: 'admin@vista-corex.de', rolle: 'Admin', rollen: ['Admin'], istAktiv: true, rufNummer: '+49 170 1234567', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg'), abteilung: 'Geschäftsführung' },
  { id: 'usr-002', vorname: 'Anna', nachname: 'Schmidt', email: 'a.schmidt@vista-corex.de', rolle: 'Projektleiter', rollen: ['Projektleiter'], istAktiv: true, rufNummer: '+49 171 2345678', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg'), abteilung: 'Projektmanagement' },
  { id: 'usr-003', vorname: 'Lukas', nachname: 'Weber', email: 'l.weber@vista-corex.de', rolle: 'Mitarbeiter', rollen: ['Mitarbeiter'], istAktiv: true, rufNummer: '+49 172 3456789', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (3).jpeg'), abteilung: 'Entwicklung' },
  { id: 'usr-004', vorname: 'Sophie', nachname: 'Fischer', email: 's.fischer@vista-corex.de', rolle: 'Mitarbeiter', rollen: ['Mitarbeiter'], istAktiv: false, rufNummer: '+49 173 4567890', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (12).jpeg'), abteilung: 'Design' },
  { id: 'usr-005', vorname: 'Jonas', nachname: 'Becker', email: 'j.becker@vista-corex.de', rolle: 'Kundenberater', rollen: ['Kundenberater'], istAktiv: true, rufNummer: '+49 174 5678901', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face14.jpeg'), abteilung: 'Vertrieb' },
];

export const mockKunden = [
  { id: 'knd-001', unternehmen: 'TechVision GmbH', vorname: 'Klaus', nachname: 'Hoffmann', email: 'k.hoffmann@techvision.de', telefon: '+49 89 12345678', branche: 'IT-Dienstleistungen', status: 'Aktiv', stadt: 'München', plz: '80331', strasse: 'Maximilianstraße 12', erstelltAm: '2025-03-15', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/ad8857c1-ee5c-4def-9554-7e4db91038a3.png') },
  { id: 'knd-002', unternehmen: 'Green Energy AG', vorname: 'Petra', nachname: 'Zimmermann', email: 'p.zimmermann@greenenergy.de', telefon: '+49 30 23456789', branche: 'Erneuerbare Energien', status: 'Aktiv', stadt: 'Berlin', plz: '10115', strasse: 'Friedrichstraße 45', erstelltAm: '2025-04-20', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/b89e4721-bb88-4716-961f-96b8f56c0886.png') },
  { id: 'knd-003', unternehmen: 'AutoParts24 GmbH', vorname: 'Markus', nachname: 'Lang', email: 'm.lang@autoparts24.de', telefon: '+49 711 34567890', branche: 'Automotive', status: 'Aktiv', stadt: 'Stuttgart', plz: '70173', strasse: 'Königstraße 78', erstelltAm: '2025-05-10', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/ca6e677b-d542-4fa2-b520-1c6b80b774f5.png') },
  { id: 'knd-004', unternehmen: 'MedTech Solutions', vorname: 'Dr. Eva', nachname: 'Braun', email: 'e.braun@medtech-solutions.de', telefon: '+49 40 45678901', branche: 'Medizintechnik', status: 'Inaktiv', stadt: 'Hamburg', plz: '20095', strasse: 'Mönckebergstraße 3', erstelltAm: '2025-01-08', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/d2d0259e-ec2a-48c7-98b7-01cdf289bea9.png') },
  { id: 'knd-005', unternehmen: 'CloudBase Systems', vorname: 'Thomas', nachname: 'Richter', email: 't.richter@cloudbase.de', telefon: '+49 69 56789012', branche: 'Cloud Computing', status: 'Aktiv', stadt: 'Frankfurt', plz: '60311', strasse: 'Zeil 100', erstelltAm: '2025-06-01', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/dc804832-a9a7-4d82-8c9f-774144d7396a.png') },
  { id: 'knd-006', unternehmen: 'BauPlan Architekten', vorname: 'Sarah', nachname: 'Klein', email: 's.klein@bauplan.de', telefon: '+49 221 67890123', branche: 'Architektur', status: 'Aktiv', stadt: 'Köln', plz: '50667', strasse: 'Hohe Straße 22', erstelltAm: '2025-02-14', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/db-logo.png') },
  { id: 'knd-007', unternehmen: 'DataFlow Analytics', vorname: 'Michael', nachname: 'Schulz', email: 'm.schulz@dataflow.de', telefon: '+49 211 78901234', branche: 'Data Science', status: 'Aktiv', stadt: 'Düsseldorf', plz: '40213', strasse: 'Schadowstraße 9', erstelltAm: '2025-07-12', logo: (import.meta.env.BASE_URL + 'demo-assets/customers/SSB.png') },
];

export const mockProjekte = [
  { id: 'prj-001', name: 'Cloud Migration 2025', beschreibung: 'Komplette Cloud-Migration der Legacy-Systeme', kundeId: 'knd-001', kundeName: 'TechVision GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ad8857c1-ee5c-4def-9554-7e4db91038a3.png'), status: 'InBearbeitung', prioritaet: 'Hoch', startDatum: '2025-04-01', endDatum: '2025-12-31', fortschritt: 65, benutzer: [{ id: 'usr-001', vorname: 'Max', nachname: 'Mustermann', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg') }, { id: 'usr-002', vorname: 'Anna', nachname: 'Schmidt', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg') }] },
  { id: 'prj-002', name: 'Solar Dashboard', beschreibung: 'Echtzeit-Monitoring für Solaranlagen', kundeId: 'knd-002', kundeName: 'Green Energy AG', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/b89e4721-bb88-4716-961f-96b8f56c0886.png'), status: 'InBearbeitung', prioritaet: 'Mittel', startDatum: '2025-05-15', endDatum: '2026-03-30', fortschritt: 40, benutzer: [{ id: 'usr-003', vorname: 'Lukas', nachname: 'Weber', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (3).jpeg') }] },
  { id: 'prj-003', name: 'ERP Integration', beschreibung: 'SAP-Schnittstelle für Ersatzteilmanagement', kundeId: 'knd-003', kundeName: 'AutoParts24 GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ca6e677b-d542-4fa2-b520-1c6b80b774f5.png'), status: 'NichtGestartet', prioritaet: 'Niedrig', startDatum: '2025-09-01', endDatum: '2026-06-30', fortschritt: 0, benutzer: [{ id: 'usr-005', vorname: 'Jonas', nachname: 'Becker', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face14.jpeg') }, { id: 'usr-002', vorname: 'Anna', nachname: 'Schmidt', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg') }] },
  { id: 'prj-004', name: 'Patienten-Portal', beschreibung: 'Web-Portal für Patientendaten', kundeId: 'knd-004', kundeName: 'MedTech Solutions', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/d2d0259e-ec2a-48c7-98b7-01cdf289bea9.png'), status: 'Pausiert', prioritaet: 'Mittel', startDatum: '2025-02-01', endDatum: '2025-08-30', fortschritt: 30, benutzer: [{ id: 'usr-004', vorname: 'Sophie', nachname: 'Fischer', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (12).jpeg') }] },
  { id: 'prj-005', name: 'Multi-Cloud Orchestrator', beschreibung: 'Kubernetes-basierte Multi-Cloud-Lösung', kundeId: 'knd-005', kundeName: 'CloudBase Systems', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/dc804832-a9a7-4d82-8c9f-774144d7396a.png'), status: 'InBearbeitung', prioritaet: 'Kritisch', startDatum: '2025-06-15', endDatum: '2026-02-28', fortschritt: 25, benutzer: [{ id: 'usr-001', vorname: 'Max', nachname: 'Mustermann', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg') }, { id: 'usr-003', vorname: 'Lukas', nachname: 'Weber', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (3).jpeg') }, { id: 'usr-005', vorname: 'Jonas', nachname: 'Becker', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face14.jpeg') }] },
  { id: 'prj-006', name: 'BIM Viewer 3D', beschreibung: '3D-Visualisierung für Bauprojekte', kundeId: 'knd-006', kundeName: 'BauPlan Architekten', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/db-logo.png'), status: 'Abgeschlossen', prioritaet: 'Niedrig', startDatum: '2024-11-01', endDatum: '2025-06-30', fortschritt: 100, benutzer: [{ id: 'usr-002', vorname: 'Anna', nachname: 'Schmidt', bild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg') }] },
];

export const mockTickets = [
  { id: 'tkt-001', titel: 'Login-Fehler bei 2FA', beschreibung: 'Benutzer können sich nach 2FA-Aktivierung nicht anmelden', status: 'Offen', prioritaet: 'Hoch', kundeId: 'knd-001', kundeName: 'TechVision GmbH', zugewiesenAn: 'usr-002', erstelltAm: '2025-08-01', projektId: 'prj-001' },
  { id: 'tkt-002', titel: 'Dashboard lädt nicht', beschreibung: 'Performance-Probleme beim Dashboard-Laden', status: 'InBearbeitung', prioritaet: 'Mittel', kundeId: 'knd-002', kundeName: 'Green Energy AG', zugewiesenAn: 'usr-003', erstelltAm: '2025-07-28', projektId: 'prj-002' },
  { id: 'tkt-003', titel: 'Datenexport fehlerhaft', beschreibung: 'CSV-Export enthält falsche Datumsformate', status: 'Geloest', prioritaet: 'Niedrig', kundeId: 'knd-003', kundeName: 'AutoParts24 GmbH', zugewiesenAn: 'usr-002', erstelltAm: '2025-07-20', projektId: 'prj-003' },
  { id: 'tkt-004', titel: 'API Timeout bei großen Anfragen', beschreibung: 'Requests über 5MB verursachen Timeout', status: 'Offen', prioritaet: 'Kritisch', kundeId: 'knd-005', kundeName: 'CloudBase Systems', zugewiesenAn: 'usr-001', erstelltAm: '2025-08-03', projektId: 'prj-005' },
  { id: 'tkt-005', titel: 'Benutzerrolle wird nicht gespeichert', beschreibung: 'Rollenzuweisung verschwindet nach Neustart', status: 'InBearbeitung', prioritaet: 'Hoch', kundeId: 'knd-001', kundeName: 'TechVision GmbH', zugewiesenAn: 'usr-003', erstelltAm: '2025-08-02', projektId: 'prj-001' },
  { id: 'tkt-006', titel: 'Suchfunktion reagiert nicht', beschreibung: 'Volltextsuche gibt keine Ergebnisse zurück', status: 'Geschlossen', prioritaet: 'Mittel', kundeId: 'knd-007', kundeName: 'DataFlow Analytics', zugewiesenAn: 'usr-005', erstelltAm: '2025-06-15', projektId: null },
];

export const mockTicketNachrichten = [
  { id: 'tn-001', ticketId: 'tkt-001', inhalt: 'Problem tritt nach dem letzten Update auf.', absenderId: 'usr-001', absenderName: 'Max Mustermann', erstelltAm: '2025-08-01T10:30:00' },
  { id: 'tn-002', ticketId: 'tkt-001', inhalt: 'Wir prüfen die 2FA-Konfiguration.', absenderId: 'usr-002', absenderName: 'Anna Schmidt', erstelltAm: '2025-08-01T11:15:00' },
  { id: 'tn-003', ticketId: 'tkt-002', inhalt: 'Cache wurde geleert, bitte erneut testen.', absenderId: 'usr-003', absenderName: 'Lukas Weber', erstelltAm: '2025-07-29T09:00:00' },
];

export const mockChatRaeume = [
  { id: 'room-001', name: 'Allgemein', typ: 'Gruppe', letzteNachricht: 'Wer kümmert sich um das Ticket #4?', letzteAktivitaet: '2025-08-05T14:30:00', ungelesen: 2 },
  { id: 'room-002', name: 'Projekt: Cloud Migration', typ: 'Projekt', letzteNachricht: 'Sprint Review morgen um 10 Uhr', letzteAktivitaet: '2025-08-05T11:00:00', ungelesen: 0 },
  { id: 'room-003', name: 'Anna Schmidt', typ: 'Direkt', letzteNachricht: 'Danke für die Info!', letzteAktivitaet: '2025-08-04T16:45:00', ungelesen: 1 },
];

export const mockChatNachrichten = [
  { id: 'msg-001', raumId: 'room-001', inhalt: 'Guten Morgen zusammen!', absenderId: 'usr-001', absenderName: 'Max Mustermann', erstelltAm: '2025-08-05T08:00:00', reaktionen: [] },
  { id: 'msg-002', raumId: 'room-001', inhalt: 'Morgen! Wer kümmert sich um das Ticket #4?', absenderId: 'usr-002', absenderName: 'Anna Schmidt', erstelltAm: '2025-08-05T08:15:00', reaktionen: [{ emoji: '👍', benutzerId: 'usr-001' }] },
  { id: 'msg-003', raumId: 'room-001', inhalt: 'Ich schaue mir das an.', absenderId: 'usr-003', absenderName: 'Lukas Weber', erstelltAm: '2025-08-05T08:20:00', reaktionen: [] },
  { id: 'msg-004', raumId: 'room-002', inhalt: 'Sprint Review morgen um 10 Uhr', absenderId: 'usr-002', absenderName: 'Anna Schmidt', erstelltAm: '2025-08-05T11:00:00', reaktionen: [] },
  { id: 'msg-005', raumId: 'room-003', inhalt: 'Hast du die Dokumentation aktualisiert?', absenderId: 'usr-001', absenderName: 'Max Mustermann', erstelltAm: '2025-08-04T16:30:00', reaktionen: [] },
  { id: 'msg-006', raumId: 'room-003', inhalt: 'Danke für die Info!', absenderId: 'usr-002', absenderName: 'Anna Schmidt', erstelltAm: '2025-08-04T16:45:00', reaktionen: [] },
];

export const mockFilialen = [
  { id: 'fil-001', name: 'Hauptsitz München', kundeId: 'knd-001', kundeName: 'TechVision GmbH', stadt: 'München', plz: '80331', strasse: 'Maximilianstraße 12', telefon: '+49 89 11111111' },
  { id: 'fil-002', name: 'Niederlassung Berlin', kundeId: 'knd-001', kundeName: 'TechVision GmbH', stadt: 'Berlin', plz: '10115', strasse: 'Unter den Linden 5', telefon: '+49 30 22222222' },
  { id: 'fil-003', name: 'Zentrale Hamburg', kundeId: 'knd-004', kundeName: 'MedTech Solutions', stadt: 'Hamburg', plz: '20095', strasse: 'Jungfernstieg 10', telefon: '+49 40 33333333' },
  { id: 'fil-004', name: 'Werk Stuttgart', kundeId: 'knd-003', kundeName: 'AutoParts24 GmbH', stadt: 'Stuttgart', plz: '70173', strasse: 'Industriestraße 88', telefon: '+49 711 44444444' },
];

export const mockZahlungen = [
  { id: 'zhl-001', kundeId: 'knd-001', kundeName: 'TechVision GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ad8857c1-ee5c-4def-9554-7e4db91038a3.png'), betrag: 12500.00, waehrung: 'EUR', status: 'Bezahlt', datum: '2025-07-15', rechnungsNr: 'INV-2025-001', zahlungsmethode: 'SEPA' },
  { id: 'zhl-002', kundeId: 'knd-002', kundeName: 'Green Energy AG', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/b89e4721-bb88-4716-961f-96b8f56c0886.png'), betrag: 8750.00, waehrung: 'EUR', status: 'Ausstehend', datum: '2025-08-01', rechnungsNr: 'INV-2025-002', zahlungsmethode: 'PayPal' },
  { id: 'zhl-003', kundeId: 'knd-003', kundeName: 'AutoParts24 GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ca6e677b-d542-4fa2-b520-1c6b80b774f5.png'), betrag: 15000.00, waehrung: 'EUR', status: 'Bezahlt', datum: '2025-06-20', rechnungsNr: 'INV-2025-003', zahlungsmethode: 'Kreditkarte' },
  { id: 'zhl-004', kundeId: 'knd-005', kundeName: 'CloudBase Systems', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/dc804832-a9a7-4d82-8c9f-774144d7396a.png'), betrag: 22000.00, waehrung: 'EUR', status: 'Überfällig', datum: '2025-07-01', rechnungsNr: 'INV-2025-004', zahlungsmethode: 'Überweisung' },
  { id: 'zhl-005', kundeId: 'knd-006', kundeName: 'BauPlan Architekten', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/db-logo.png'), betrag: 6300.00, waehrung: 'EUR', status: 'Bezahlt', datum: '2025-07-28', rechnungsNr: 'INV-2025-005', zahlungsmethode: 'SEPA' },
];

export const mockBerichte = [
  { id: 'ber-001', titel: 'Projektbericht Q2 2025', entityType: 'projekt', entityId: 'prj-001', version: '1.0', dateiName: 'projektbericht_q2.pdf', groesse: 2048000, erstelltAm: '2025-07-01', bearbeitetAm: '2025-07-04', bearbeitetVon: 'Anna Schmidt', bearbeitetVonBild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg'), hochgeladenVon: 'Max Mustermann', hochgeladenVonBild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg') },
  { id: 'ber-002', titel: 'Kundenanalyse TechVision', entityType: 'kunde', entityId: 'knd-001', version: '2.1', dateiName: 'kundenanalyse_tv.xlsx', groesse: 512000, erstelltAm: '2025-06-15', bearbeitetAm: '2025-06-20', bearbeitetVon: 'Max Mustermann', bearbeitetVonBild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (8).jpeg'), hochgeladenVon: 'Anna Schmidt', hochgeladenVonBild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (11).jpeg') },
  { id: 'ber-003', titel: 'Ticket-Statistik Juli', entityType: 'ticket', entityId: null, version: '1.0', dateiName: 'ticket_stats_jul.pdf', groesse: 1024000, erstelltAm: '2025-08-01', hochgeladenVon: 'Lukas Weber', hochgeladenVonBild: (import.meta.env.BASE_URL + 'demo-assets/persons/Face (3).jpeg') },
];

export const mockAbonnements = [
  { id: 'abo-001', kundeId: 'knd-001', kundeName: 'TechVision GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ad8857c1-ee5c-4def-9554-7e4db91038a3.png'), plan: 'Enterprise', status: 'Aktiv', startDatum: '2025-01-01', endDatum: '2025-12-31', preis: 499.00 },
  { id: 'abo-002', kundeId: 'knd-002', kundeName: 'Green Energy AG', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/b89e4721-bb88-4716-961f-96b8f56c0886.png'), plan: 'Professional', status: 'Aktiv', startDatum: '2025-04-01', endDatum: '2026-03-31', preis: 299.00 },
  { id: 'abo-003', kundeId: 'knd-003', kundeName: 'AutoParts24 GmbH', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/ca6e677b-d542-4fa2-b520-1c6b80b774f5.png'), plan: 'Enterprise', status: 'Aktiv', startDatum: '2025-05-01', endDatum: '2026-04-30', preis: 499.00 },
  { id: 'abo-004', kundeId: 'knd-004', kundeName: 'MedTech Solutions', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/d2d0259e-ec2a-48c7-98b7-01cdf289bea9.png'), plan: 'Basic', status: 'Gekündigt', startDatum: '2025-01-01', endDatum: '2025-06-30', preis: 99.00 },
  { id: 'abo-005', kundeId: 'knd-005', kundeName: 'CloudBase Systems', kundeLogo: (import.meta.env.BASE_URL + 'demo-assets/customers/dc804832-a9a7-4d82-8c9f-774144d7396a.png'), plan: 'Professional', status: 'Aktiv', startDatum: '2025-06-01', endDatum: '2026-05-31', preis: 299.00 },
];

export const mockPlaene = [
  { id: 'plan-001', name: 'Basic', preis: 99.00, features: ['5 Benutzer', '10 Projekte', 'E-Mail-Support'] },
  { id: 'plan-002', name: 'Professional', preis: 299.00, features: ['25 Benutzer', '50 Projekte', 'Prioritäts-Support', 'API-Zugang'] },
  { id: 'plan-003', name: 'Enterprise', preis: 499.00, features: ['Unbegrenzte Benutzer', 'Unbegrenzte Projekte', '24/7 Support', 'API-Zugang', 'Dedizierter Account Manager'] },
];

export const mockAnsprechpartner = [
  { id: 'asp-001', kundeId: 'knd-001', vorname: 'Bernd', nachname: 'Müller', email: 'b.mueller@techvision.de', telefon: '+49 89 99999001', position: 'CTO' },
  { id: 'asp-002', kundeId: 'knd-001', vorname: 'Katrin', nachname: 'Vogel', email: 'k.vogel@techvision.de', telefon: '+49 89 99999002', position: 'Projektmanager' },
  { id: 'asp-003', kundeId: 'knd-002', vorname: 'Jürgen', nachname: 'Stein', email: 'j.stein@greenenergy.de', telefon: '+49 30 88888001', position: 'Geschäftsführer' },
  { id: 'asp-004', kundeId: 'knd-005', vorname: 'Lisa', nachname: 'Neumann', email: 'l.neumann@cloudbase.de', telefon: '+49 69 77777001', position: 'Head of Engineering' },
];

export const mockDashboard = {
  kundenAnzahl: 7,
  projekteAnzahl: 6,
  ticketsOffen: 2,
  benutzerAnzahl: 5,
  umsatzGesamt: 64550.00,
  ticketsGesamt: 6,
  projekteFortschritt: [
    { name: 'Cloud Migration', fortschritt: 65 },
    { name: 'Solar Dashboard', fortschritt: 40 },
    { name: 'ERP Integration', fortschritt: 0 },
    { name: 'Patienten-Portal', fortschritt: 30 },
    { name: 'Multi-Cloud', fortschritt: 25 },
    { name: 'BIM Viewer', fortschritt: 100 },
  ],
  ticketStatus: [
    { name: 'Offen', anzahl: 2 },
    { name: 'InBearbeitung', anzahl: 2 },
    { name: 'Geloest', anzahl: 1 },
    { name: 'Geschlossen', anzahl: 1 },
  ],
  letzteAktivitaeten: [
    { typ: 'ticket', nachricht: 'Neues Ticket: API Timeout bei großen Anfragen', datum: '2025-08-03T09:00:00' },
    { typ: 'projekt', nachricht: 'Cloud Migration: Fortschritt auf 65% aktualisiert', datum: '2025-08-02T14:00:00' },
    { typ: 'kunde', nachricht: 'Neuer Kunde: DataFlow Analytics hinzugefügt', datum: '2025-07-12T10:00:00' },
  ],
};
