# Repositorio-de-3-personas

Catálogo de productos (HTML, CSS y JavaScript) con datos en `localStorage`.

## Despliegue en Netlify

1. Entra en [netlify.com](https://www.netlify.com) e inicia sesión (puedes usar **GitHub**).
2. **Add new site** → **Import an existing project** y elige el repositorio  
   `Roriri1313/Repositorio-de-3-personas` (o el que uses).
3. En la configuración del proyecto:
   - **Branch to deploy:** `main` (o la rama por defecto).
   - **Build command:** déjalo vacío (no hay build; el archivo `netlify.toml` indica `publish = "."`).
   - **Publish directory:** `.` (punto = raíz del repo, donde está `index.html`).
4. Pulsa **Deploy site**. Netlify te dará una URL del tipo `https://nombre-random.netlify.app` (puedes cambiar el nombre en **Site settings → Domain management**).
5. Cada `git push` a la rama conectada vuelve a desplegar el sitio automáticamente.

**Alternativa rápida:** en el panel de Netlify, **Sites** → **Deploy manually** y arrastra la carpeta del proyecto (solo si no quieres enlazar GitHub).

**Nota:** Este proyecto no usa npm ni compilación; solo archivos estáticos en la raíz.