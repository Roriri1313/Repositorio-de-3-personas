# Repositorio-de-3-personas

Catálogo de productos (HTML, CSS y JavaScript) con datos en `localStorage`.

## Despliegue en Vercel

1. Entra en [vercel.com](https://vercel.com) e inicia sesión (puedes usar **Continue with GitHub**).
2. **Add New…** → **Project** → **Import** el repositorio `Roriri1313/Repositorio-de-3-personas` (o el que uses).
3. En la configuración del proyecto:
   - **Framework Preset:** Other (o detectará sitio estático).
   - **Root Directory:** `./` (raíz del repo).
   - **Build Command:** déjalo vacío (no hay build).
   - **Output Directory:** déjalo vacío o `./` (los archivos están en la raíz: `index.html`, `styles.css`, `app.js`).
4. Pulsa **Deploy**. En unos segundos tendrás una URL del tipo `https://repositorio-de-3-personas-xxx.vercel.app`.
5. Cada vez que hagas `git push` a la rama conectada, Vercel volverá a desplegar automáticamente.

**Nota:** Si Vercel pide comando de build, puedes poner `exit 0` o dejar vacío según la interfaz. Este proyecto no usa npm ni compilación.