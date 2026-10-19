# MyCash — guscio installabile

Questa cartella trasforma la web app Apps Script di MyCash in un'"app" con icona sulla schermata Home, schermata di avvio e apertura a tutto schermo.
Non contiene dati né logica: carica l'app Apps Script, che resta l'unico posto dove gira MyCash.

## File
| File | A cosa serve |
|---|---|
| `config.js` | **L'unico da modificare**: l'URL `/exec` della web app |
| `index.html` | Schermata di avvio + apertura dell'app |
| `manifest.webmanifest` | Nome, colori e icone dell'app installata |
| `sw.js` | Rende l'app installabile; mette in cache solo il guscio |
| `privacy.html` | Informativa pubblica (versione generale) |
| `icons/` | Icone |

## Pubblicazione (solo dal browser)
1. **GitHub** → New repository → nome `mycash-app` → Create.
2. *uploading an existing file* → trascina **tutto il contenuto** di questa cartella (anche la cartella `icons`) → Commit.
3. Apri `config.js` → ✏️ → incolla l'URL della web app tra le virgolette di `MYCASH_URL` → Commit.
4. **Vercel** → Add New → Project → importa `mycash-app` → Deploy (nessuna impostazione da cambiare).
5. Copia l'indirizzo che ti dà Vercel (es. `https://mycash-app.vercel.app`) e incollalo in **Codice.gs** nella costante `APP_SHELL_URL`, poi Nuova versione della distribuzione Apps Script.

## Come si comporta
- **Android / computer**: l'app si apre dentro il guscio, a tutto schermo. Se dopo 9 secondi non è comparsa, appare il pulsante "Apri MyCash".
- **iPhone / iPad**: Safari non permette all'account Google di funzionare dentro un riquadro, quindi il guscio apre direttamente l'app. L'icona sulla Home resta quella di MyCash.
- Aggiungendo `?diretto` all'indirizzo si forza sempre l'apertura diretta.

## Requisito della web app Apps Script
Distribuisci → Gestisci distribuzioni → **Esegui come: Utente che accede all'applicazione web**.
Con "Esegui come: io" l'app si blocca da sola, perché i dati dei dipendenti finirebbero nel tuo account.
