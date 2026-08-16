# La Tana del Gatto — Sito ufficiale

Sito vetrina per **La Tana del Gatto Pizzeria & Hamburgeria** di Carpi (MO).
Realizzato con uno stack moderno e responsive, in linea con il progetto di
riferimento [ilcovodelbastardo](https://github.com/officialBurtaxz/ilcovodelbastardo).

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 3.4** (palette custom "gatto": verde boccia + oro + terracotta)
- **react-router-dom 7**
- **GSAP** + ScrollTrigger (animazioni d'ingresso e on-scroll)
- **lucide-react** (icone)
- **oxlint** (lint)

## Contenuti (reali)

I dati del locale provengono da **Google Maps**, il menù dal **PDF ufficiale**
su Google Drive e il logo + la galleria dalla **pagina Instagram** ufficiale.

| Campo | Valore |
| --- | --- |
| Nome | La Tana del Gatto — Pizzeria & Hamburgeria |
| Indirizzo | Via Guido Fassi 9, 41012 Carpi (MO) |
| Telefono / WhatsApp | 379 315 7033 |
| Valutazione | 4.7 ★ · 49 recensioni (Google) |
| Instagram | @latanadelgattocarpi |
| TheFork | thefork.it/ristorante/la-tana-del-gatto-r857184 |
| Orari (estivi) | Lun chiuso · Mar–Dom 19:00–24:00 (solo cena) |
| Coordinate | 44.7841595, 10.8811402 |

- **Logo** — `public/logo.jpg`, recuperato dal profilo Instagram ufficiale.
- **Galleria** — 5 foto dei post Instagram in `public/gallery/` (componente `Gallery`).
- **Menu** — `src/data/menu.json` ricostruito dal PDF ufficiale del locale
  (Pizze Classiche, Specialità, Gli Hamburger, Carni/Fritti/Supplementi, Bibite).
- Le **recensioni** mostrate sono testi reali estratti dalla scheda Google.

> Per aggiornare il listino basta sostituire `src/data/menu.json`; per le
> immagini della galleria, i file in `public/gallery/` con il filtro in
> `src/data/gallery.json`.

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
  components/   Navbar, Hero, About, MenuPreview, Gallery, Reviews,
                Location, Footer, InstagramIcon
  data/         contacts.js (dati reali) · menu.json (listino) · gallery.json
  pages/        Home.jsx · MenuPage.jsx
  App.jsx       router (/, /menu)
  index.css     font + base + utility
public/
  logo.jpg      logo reale del locale (da Instagram)
  gallery/      foto dei post Instagram
index.html      meta SEO (IT) + favicon
```

## Responsiveness

- Mobile-first con Tailwind (breakpoint `sm` / `md` / `lg`).
- Navbar mobile a tutto schermo con menu animato.
- `MenuPage` con sidebar categorie su desktop e drawer a tutto schermo su mobile.
- Tipografia fluida, griglie adattive, animazioni GSAP leggere.