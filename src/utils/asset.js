/**
 * Prefissa un path di asset pubblico con il base URL dell'app.
 * Necessario perché gli asset referenziati a runtime (es. `/logo.jpg`,
 * `/gallery/ig1.jpg`) non vengono riscritti da Vite in fase di build, e su
 * GitHub Pages il sito è servito sotto `/LaTanadelGatto/`.
 *
 * Uso:  <img src={asset('/logo.jpg')} />
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL // '/' in dev, '/LaTanadelGatto/' in prod
  const clean = path.replace(/^\//, '')
  return `${base}${clean}`
}