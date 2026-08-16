# La Tana del Gatto — Sito ufficiale

Sito vetrina per **La Tana del Gatto Pizzeria & Hamburgeria** di Carpi (MO).
Realizzato con uno stack moderno e responsive, in linea con il progetto di
riferimento [ilcovodelbastardo](https://github.com/officialBurtaxz/ilcovodelbastardo).

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3.4** (tema custom warm "gatto")
- **react-router-dom 7**
- **GSAP** + ScrollTrigger (animazioni d'ingresso e on-scroll)
- **lucide-react** (icone)
- **oxlint** (lint)

## Contenuti (da Google Maps)

Tutti i dati del locale provengono dalla scheda Google Maps:

| Campo | Valore |
| --- | --- |
| Nome | La Tana del Gatto — Pizzeria & Hamburgeria |
| Indirizzo | Via Guido Fassi 9, 41012 Carpi (MO) |
| Telefono / WhatsApp | 379 315 7033 |
| Valutazione | 4.7 ★ · 49 recensioni |
| Instagram | @latanadelgattocarpi |
| TheFork | thefork.it/ristorante/la-tana-del-gatto-r857184 |
| Orari | Lun chiuso · Mar–Ven 12–14 / 19–23 · Sab 19–24 · Dom 19–23 |
| Coordinate | 44.7841595, 10.8811402 |

Le ricensioni mostrate sono testi reali estratti dalla scheda Google.

> Il menu è un listino rappresentativo di una pizzeria/hamburgeria con forno a
> legna (prezzi realistici per Carpi). Non essendo pubblicato su Google Maps, è
> facilmente sostituibile modificando `src/data/menu.json`. Per il listino sempre
> aggiornato il sito rimanda a TheFork e al WhatsApp del locale.

## Avvio

```bash
npm install
npm run dev      # sviluppo su http://localhost:5173
npm run build    # build di produzione in dist/
npm run preview  # anteprima del build
npm run lint     # oxlint
```

## Struttura

```
src/
  components/   Navbar, Hero, About, MenuPreview, Reviews, Location, Footer, Logo
  data/         contacts.js (dati reali) · menu.json (listino)
  pages/        Home.jsx · MenuPage.jsx
  App.jsx       router (/, /menu)
  index.css     font + base + utility
index.html      meta SEO (IT) + favicon
```

## Responsiveness

- Mobile-first con Tailwind (breakpoint `sm` / `md` / `lg`).
- Navbar mobile a tutto schermo con menu animato.
- `MenuPage` con sidebar categorie su desktop e drawer a tutto schermo su mobile.
- Tipografia fluida, griglie adattive, animazioni GSAP leggere.