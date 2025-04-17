# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

requisiti
Sulla base delle informazioni fornite nel documento, ecco una lista dettagliata di requisiti funzionali per una webapp destinata a un TSO (Transmission System Operator):

1. Gestione dei dati di rete elettrica:
   1.1. Implementare il modello dati CIM (Common Information Model) IEC 61970/61968 per rappresentare gli elementi della rete di trasmissione.
   1.2. Supportare l'importazione ed esportazione di dati di rete in formato CIM/XML e CIM/RDF.
   1.3. Gestire le diverse versioni del modello CIM (es. CIM15v33).
   1.4. Supportare i profili CIM standard come CPSM (Common Power System Model) ed ENTSO-E.

2. Visualizzazione della topologia di rete:
   2.1. Visualizzare la rete di trasmissione utilizzando diagrammi unifilari interattivi.
   2.2. Supportare diversi livelli di zoom e pan sulla topologia di rete.
   2.3. Evidenziare elementi critici della rete (es. congestioni, violazioni di limiti).
   2.4. Permettere la visualizzazione di dati in tempo reale sovrapposti alla topologia.

3. Gestione dei flussi di potenza:
   3.1. Calcolare i flussi di potenza sulla rete utilizzando algoritmi standard (es. Newton-Raphson).
   3.2. Visualizzare i risultati dei flussi di potenza sulla topologia di rete.
   3.3. Identificare violazioni dei limiti di trasmissione e congestioni.
   3.4. Supportare analisi "N-1" per valutare la sicurezza della rete.

4. Gestione dello scambio dati:
   4.1. Implementare lo standard IEC 61850 per la comunicazione con sottostazioni e dispositivi di campo.
   4.2. Supportare lo scambio dati in tempo reale utilizzando il protocollo IEC 60870-5-104.
   4.3. Implementare lo standard IEC 62325 per la comunicazione con il mercato elettrico.
   4.4. Supportare lo scambio di programmi di scambio utilizzando il formato ENTSO-E ESS (Scheduling System).

5. Sicurezza informatica:
   5.1. Implementare le misure di sicurezza definite nello standard IEC 62351.
   5.2. Supportare l'autenticazione a due fattori per l'accesso al sistema.
   5.3. Implementare la crittografia end-to-end per le comunicazioni sensibili.
   5.4. Registrare e monitorare tutti gli accessi e le operazioni critiche (audit trail).

6. Gestione degli allarmi e degli eventi:
   6.1. Implementare un sistema di gestione allarmi conforme allo standard IEC 61850-7-4.
   6.2. Visualizzare gli allarmi in tempo reale con diversi livelli di priorità.
   6.3. Supportare il riconoscimento e la gestione degli allarmi da parte degli operatori.
   6.4. Archiviare gli allarmi e gli eventi per analisi successive.

7. Previsione e bilanciamento:
   7.1. Implementare algoritmi di previsione della domanda a breve e medio termine.
   7.2. Supportare l'integrazione di previsioni di produzione da fonti rinnovabili.
   7.3. Calcolare il fabbisogno di riserva in base alle previsioni e all'incertezza.
   7.4. Ottimizzare il dispacciamento delle risorse di bilanciamento.

8. Gestione dei mercati:
   8.1. Supportare l'interfacciamento con la piattaforma di mercato utilizzando lo standard IEC 62325.
   8.2. Calcolare le capacità di trasmissione disponibili per il mercato (ATC/NTC).
   8.3. Gestire le offerte di servizi ancillari e di bilanciamento.
   8.4. Calcolare i prezzi zonali/nodali in base ai risultati del mercato e ai vincoli di rete.

9. Pianificazione e manutenzione della rete:
   9.1. Supportare la pianificazione degli interventi di manutenzione sulla rete.
   9.2. Valutare l'impatto degli interventi pianificati sulla sicurezza e capacità della rete.
   9.3. Ottimizzare la schedulazione degli interventi per minimizzare l'impatto sul sistema.
   9.4. Tracciare lo stato e l'avanzamento degli interventi di manutenzione.

10. Reporting e analisi:
    10.1. Generare report standard per i regolatori (es. qualità del servizio, indisponibilità).
    10.2. Supportare la creazione di report personalizzati con grafici e tabelle interattive.
    10.3. Implementare funzionalità di analisi dei dati storici (es. trend, correlazioni).
    10.4. Calcolare KPI (Key Performance Indicators) relativi alle prestazioni della rete e del TSO.

11. Integrazione con sistemi esterni:
    11.1. Interfacciarsi con sistemi SCADA esistenti utilizzando protocolli standard (es. IEC 60870-5-104).
    11.2. Supportare l'integrazione con sistemi GIS per la geolocalizzazione degli asset.
    11.3. Interfacciarsi con sistemi di gestione degli asset (EAM) per lo scambio di dati sulla manutenzione.
    11.4. Supportare l'integrazione con sistemi di previsione meteo esterni.

12. Gestione utenti e ruoli:
    12.1. Implementare un sistema di gestione utenti con diversi livelli di accesso.
    12.2. Supportare la definizione di ruoli personalizzati con permessi granulari.
    12.3. Implementare la separazione dei dati per diverse aree di controllo/responsabilità.
    12.4. Supportare l'autenticazione federata (es. SAML) per l'integrazione con sistemi aziendali.

13. Conformità agli standard geografici:
    13.1. Supportare diversi sistemi di coordinate geografiche (es. WGS84, UTM).
    13.2. Implementare la visualizzazione di mappe geografiche della rete di trasmissione.
    13.3. Supportare l'integrazione con servizi di mappe esterni (es. OpenStreetMap, Google Maps).
    13.4. Gestire le informazioni geografiche degli asset di rete nel modello dati CIM.

14. Gestione delle metriche di performance:
    14.1. Implementare il calcolo automatico di metriche di sicurezza della rete (es. N-1, LOLE).
    14.2. Calcolare e visualizzare metriche di qualità della frequenza (es. deviazione media, ROCOF).
    14.3. Monitorare metriche di utilizzo della rete (es. congestioni, margini di trasmissione).
    14.4. Implementare dashboard configurabili per la visualizzazione delle metriche chiave.

15. Supporto multilingua:
    15.1. Implementare l'interfaccia utente in almeno due lingue (es. inglese + lingua locale).
    15.2. Supportare la gestione di contenuti multilingua nel modello dati (es. nomi degli asset).
    15.3. Generare report e documenti in diverse lingue.
    15.4. Supportare la localizzazione di unità di misura e formati numerici.

16. Gestione delle interconnessioni:
    16.1. Modellare e visualizzare le interconnessioni con TSO adiacenti.
    16.2. Implementare lo scambio dati in tempo reale con TSO confinanti utilizzando il protocollo ICCP/TASE.2.
    16.3. Calcolare e visualizzare i flussi di potenza sulle interconnessioni.
    16.4. Supportare la gestione coordinata delle capacità di interconnessione (NTC, ATC).

17. Analisi di stabilità:
    17.1. Eseguire analisi di stabilità transitoria sulla rete di trasmissione.
    17.2. Implementare funzionalità di analisi modale per identificare modi di oscillazione critici.
    17.3. Calcolare i margini di stabilità di tensione per diverse condizioni operative.
    17.4. Visualizzare i risultati delle analisi di stabilità sulla topologia di rete.

18. Gestione delle perdite di trasmissione:
    18.1. Calcolare le perdite di trasmissione in tempo reale e su base previsionale.
    18.2. Implementare algoritmi di ottimizzazione per la riduzione delle perdite.
    18.3. Allocare le perdite ai diversi utenti della rete secondo metodologie approvate.
    18.4. Generare report periodici sulle perdite di trasmissione per fini regolatori.

19. Gestione dei servizi ancillari:
    19.1. Modellare e tracciare le risorse disponibili per servizi ancillari (es. riserva, regolazione).
    19.2. Implementare algoritmi per la selezione ottimale delle risorse di regolazione primaria e secondaria.
    19.3. Monitorare in tempo reale la fornitura di servizi ancillari da parte delle risorse selezionate.
    19.4. Calcolare i costi associati alla fornitura di servizi ancillari e generare report di settlement.

20. Gestione delle congestioni:
    20.1. Identificare in tempo reale le congestioni sulla rete di trasmissione.
    20.2. Implementare algoritmi di redispatching per la risoluzione delle congestioni.
    20.3. Calcolare i costi associati alla gestione delle congestioni.
    20.4. Fornire previsioni di congestioni future basate su scenari di mercato e di rete.

21. Integrazione delle energie rinnovabili:
    21.1. Modellare e visualizzare gli impianti di produzione da fonti rinnovabili connessi alla rete.
    21.2. Integrare previsioni di produzione da fonti rinnovabili a diverse scale temporali.
    21.3. Calcolare la capacità di hosting della rete per nuovi impianti rinnovabili.
    21.4. Implementare funzionalità di curtailment degli impianti rinnovabili in caso di necessità.

22. Gestione dei black-out e ripristino:
    22.1. Implementare funzionalità di simulazione di scenari di black-out.
    22.2. Supportare la definizione e l'esecuzione di piani di ripristino della rete.
    22.3. Fornire checklist interattive per gli operatori durante le procedure di ripristino.
    22.4. Registrare e analizzare gli eventi durante il processo di ripristino.

23. Monitoraggio della qualità dell'energia:
    23.1. Integrare dati da dispositivi di misura della qualità dell'energia (es. PMU, analizzatori di rete).
    23.2. Calcolare e visualizzare indici di qualità dell'energia (es. THD, flicker) in punti critici della rete.
    23.3. Generare allarmi in caso di violazione dei limiti di qualità dell'energia.
    23.4. Produrre report periodici sulla qualità dell'energia per fini regolatori.

24. Gestione dei carichi interrompibili:
    24.1. Modellare e tracciare i contratti di carico interrompibile.
    24.2. Implementare funzionalità per l'attivazione manuale e automatica dei carichi interrompibili.
    24.3. Calcolare la compensazione economica per l'attivazione dei carichi interrompibili.
    24.4. Generare report sull'utilizzo dei carichi interrompibili.

25. Analisi di affidabilità della rete:
    25.1. Eseguire analisi probabilistiche di affidabilità della rete (es. Monte Carlo).
    25.2. Calcolare indici di affidabilità come SAIDI, SAIFI, EENS per diverse porzioni della rete.
    25.3. Identificare i componenti critici per l'affidabilità del sistema.
    25.4. Supportare l'analisi costi-benefici di interventi di miglioramento dell'affidabilità.

26. Gestione dei dati meteorologici:
    26.1. Integrare dati meteorologici in tempo reale da stazioni meteo sulla rete.
    26.2. Incorporare previsioni meteorologiche a breve e medio termine.
    26.3. Visualizzare dati meteorologici sovrapposti alla topologia di rete.
    26.4. Utilizzare dati meteorologici per calcoli di rating dinamico delle linee.

27. Simulazione di scenari di rete:
    27.1. Creare e gestire scenari "what-if" per diverse configurazioni di rete e condizioni operative.
    27.2. Eseguire analisi di sicurezza su scenari futuri della rete.
    27.3. Comparare risultati di diversi scenari attraverso report e visualizzazioni dedicate.
    27.4. Supportare l'ottimizzazione di parametri di rete basata su simulazioni di scenari.

28. Gestione dei dispositivi FACTS:
    28.1. Modellare e visualizzare dispositivi FACTS (Flexible AC Transmission Systems) sulla rete.
    28.2. Implementare algoritmi di controllo ottimale per dispositivi FACTS.
    28.3. Monitorare in tempo reale lo stato e le prestazioni dei dispositivi FACTS.
    28.4. Analizzare l'impatto dei dispositivi FACTS sui flussi di potenza e sulla stabilità del sistema.

29. Supporto alla pianificazione degli investimenti:
    29.1. Identificare colli di bottiglia e criticità sulla rete di trasmissione.
    29.2. Supportare l'analisi costi-benefici di potenziali investimenti sulla rete.
    29.3. Simulare l'impatto di nuovi investimenti sulla capacità e affidabilità della rete.
    29.4. Generare report per supportare la presentazione di piani di sviluppo ai regolatori.

30. Gestione della cyber-security:
    30.1. Implementare un sistema di rilevamento delle intrusioni (IDS) specifico per reti elettriche.
    30.2. Eseguire scansioni periodiche di vulnerabilità sui sistemi critici.
    30.3. Simulare scenari di attacco cyber per testare la resilienza del sistema.
    30.4. Implementare procedure automatizzate di risposta agli incidenti di sicurezza.

31. Integrazione con sistemi di storage:
    31.1. Modellare e visualizzare sistemi di accumulo connessi alla rete di trasmissione.
    31.2. Implementare algoritmi di ottimizzazione per l'utilizzo dei sistemi di storage.
    31.3. Monitorare in tempo reale lo stato di carica e le prestazioni dei sistemi di accumulo.
    31.4. Prevedere la disponibilità futura dei sistemi di storage basata su previsioni di rete e di mercato.

32. Gestione delle serie temporali:
    32.1. Implementare un database ottimizzato per la gestione di serie temporali ad alta frequenza.
    32.2. Supportare l'aggregazione e il downsampling di dati temporali a diverse scale.
    32.3. Fornire funzionalità avanzate di ricerca e filtraggio su serie temporali.
    32.4. Implementare meccanismi di compressione e archiviazione efficiente dei dati storici.

33. Supporto al demand response:
    33.1. Modellare e tracciare le risorse di demand response disponibili sulla rete.
    33.2. Implementare algoritmi per la previsione della risposta dei carichi a segnali di prezzo o controllo.
    33.3. Calcolare il potenziale di demand response disponibile in tempo reale.
    33.4. Supportare l'attivazione e il monitoraggio di programmi di demand response.

34. Analisi della resilienza della rete:
    34.1. Implementare modelli per la valutazione della resilienza della rete a eventi estremi.
    34.2. Simulare l'impatto di disastri naturali (es. tempeste, terremoti) sulla rete di trasmissione.
    34.3. Identificare i componenti critici per la resilienza del sistema.
    34.4. Supportare la pianificazione di interventi per migliorare la resilienza della rete.

35. Gestione dei contratti di trasporto:
    35.1. Modellare e tracciare i contratti di trasporto dell'energia sulla rete.
    35.2. Calcolare la capacità disponibile per nuovi contratti di trasporto.
    35.3. Verificare il rispetto dei limiti contrattuali in tempo reale.
    35.4. Generare report di settlement per i contratti di trasporto.

Questi ulteriori requisiti funzionali coprono aspetti avanzati della gestione di una rete di trasmissione, includendo funzionalità specifiche che un moderno TSO potrebbe richiedere per operare in modo efficiente e sicuro in un contesto di rete sempre più complesso e dinamico.
