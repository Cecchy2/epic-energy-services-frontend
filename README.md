# epic-energy-services-frontend

# EPIC ENERGY SERVICES CRM

Questo progetto è un sistema CRM per "EPIC ENERGY SERVICES", un'azienda fornitrice di energia, progettato per gestire i contatti e le interazioni con i clienti business. È composto da un backend in **Java con Spring Boot** e un frontend in **React**.

## Descrizione del progetto

Il sistema permette di gestire in modo completo i clienti dell'azienda, supportando tutte le operazioni CRUD (Creazione, Lettura, Aggiornamento, Eliminazione). È strutturato come un'applicazione Web RESTful, con autenticazione JWT per la gestione degli utenti e ruoli differenziati di accesso alle funzionalità.

### Funzionalità principali:

- **Gestione Clienti:**

  - Dati cliente: ragione sociale, partita IVA, email, data di inserimento, data ultimo contatto, fatturato annuale, pec, telefono, e informazioni di contatto specifiche.
  - Indirizzi: supporto per fino a due indirizzi (sede legale e operativa) per ciascun cliente, con informazioni dettagliate.
  - Tipologie di clienti: PA, SAS, SPA, SRL.

- **Gestione Indirizzi e Località:**

  - Ogni cliente può avere indirizzi di sede legale e operativa.
  - Centralizzazione di comuni e province, con dati importati da CSV.

- **Importazione Dati da CSV:**

  - Importazione di un elenco di comuni e province italiane tramite file CSV (`elenco-comuni-italiani.csv` e `elenco-province-italiane.csv`) per popolare il database con un'esecuzione manuale di un'apposita procedura Java.

- **Gestione Fatture:**

  - Associazione di fatture ai clienti, con dettagli di data, importo e numero.
  - Supporto per stati di fattura dinamici, modificabili in base alle esigenze di business.

- **Funzionalità di Ordinamento e Filtraggio:**

  - Ordinamento dei clienti per: nome, fatturato annuale, data di inserimento, data ultimo contatto e provincia della sede legale.
  - Filtraggio clienti per: fatturato annuale, data di inserimento, data ultimo contatto e parte del nome.
  - Filtraggio delle fatture per: cliente, stato, data, anno e range di importi.

- **Autenticazione e Autorizzazione:**

  - Implementazione di un sistema basato su JWT con utenti caratterizzati da username, email, password, nome, cognome e avatar.
  - Ruoli utente:
    - `USER`: può eseguire operazioni di lettura e inserire nuovi clienti.
    - `ADMIN`: accesso completo a tutte le funzionalità della piattaforma.

- **Invio Email:**
  - Gli admin possono inviare email direttamente al contatto di ciascun cliente.

## Tecnologie Utilizzate

- **Backend:** Java, Spring Boot, PostgreSQL
- **Frontend:** React
- **Autenticazione:** JWT
- **Database:** PostgreSQL
- **Strumenti Aggiuntivi:** Importazione CSV, invio email

## Requisiti e Setup

### Clonazione delle Repository

- **Backend:** [EPIC ENERGY SERVICES - Backend](https://github.com/Cecchy2/buildweek_epic_energy_services.git)
- **Frontend:** [EPIC ENERGY SERVICES - Frontend](https://github.com/Cecchy2/epic-energy-services-frontend.git)

### Configurazione Backend

1. Clona la repository del backend.
2. Configura il database PostgreSQL e aggiorna le credenziali nel file `application.properties`.
3. Esegui il backend con il comando:
   ```bash
   mvn spring-boot:run
   ```
