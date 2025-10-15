# 🚀 Guía de Despliegue en GitHub Pages

## ✅ Checklist Pre-Despliegue

Antes de hacer deploy, asegúrate de que:

- [x] El proyecto está configurado para GitHub Pages (`package.json` y `vite.config.mjs`)
- [x] El favicon está correctamente configurado (`index.html`)
- [x] El `.gitignore` excluye `node_modules/` y `dist/`
- [ ] Has añadido capturas de pantalla en `docs/screenshots/`
- [ ] Has probado el build localmente con `npm run build` y `npm run preview`
- [ ] No hay errores en la consola del navegador
- [ ] El proyecto funciona correctamente en desktop y móvil

---

## 📝 Paso a Paso

### 1. Preparar el Repositorio en GitHub

```bash
# Si aún no has inicializado git:
cd c:\Users\andre\Desktop\portfolio
git init

# Añadir archivos
git add .

# Primer commit
git commit -m "feat: portfolio interactivo pixel art listo para deploy"

# Crear repositorio en GitHub (desde la web):
# https://github.com/new
# Nombre sugerido: portfolio

# Conectar con GitHub
git remote add origin https://github.com/avalob/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Desplegar en GitHub Pages

```bash
# Ir a la carpeta frontend
cd frontend

# Instalar dependencias (si no lo has hecho)
npm install

# Build de producción
npm run build

# Deploy a GitHub Pages
npm run deploy
```

**Esto creará automáticamente:**
- Una rama `gh-pages` con el contenido de `dist/`
- El sitio estará disponible en: `https://avalob.github.io/portfolio/`

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/avalob/portfolio`
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**
4. En **Source**, verifica que esté seleccionado:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Haz clic en **Save** si es necesario
6. Espera 2-3 minutos y visita: `https://avalob.github.io/portfolio/`

### 4. Verificar el Deploy

✅ **Indicadores de éxito:**
- Badge verde en GitHub Actions (si está configurado)
- El sitio carga correctamente sin errores 404
- El favicon aparece en la pestaña del navegador
- Los controles funcionan correctamente
- Las imágenes de los proyectos se cargan
- Los modales se abren sin problemas

❌ **Si algo falla:**
1. Revisa la consola del navegador (F12)
2. Verifica que las rutas de las imágenes sean correctas
3. Confirma que `vite.config.mjs` tenga `base: './'`
4. Ejecuta `npm run build` localmente y revisa errores

---

## 🔄 Actualizaciones Futuras

Cada vez que quieras actualizar el portfolio:

```bash
# 1. Hacer cambios en el código
# 2. Probar localmente
npm run dev

# 3. Build y deploy
npm run build
npm run deploy

# 4. (Opcional) Commit y push al repositorio principal
git add .
git commit -m "update: descripción de los cambios"
git push origin main
```

---

## 🎨 Añadir Capturas de Pantalla

1. Toma las capturas según las instrucciones en `docs/screenshots/README.md`
2. Guárdalas en `docs/screenshots/` con los nombres:
   - `desktop-view.png`
   - `npc-interaction.png`
   - `mobile-controls.png`
   - `modal-experience.png`
   - `recruiter-panel.png`
3. Commit y push:

```bash
git add docs/screenshots/*.png
git commit -m "docs: añadir capturas de pantalla"
git push origin main
```

Las imágenes se mostrarán automáticamente en el README.

---

## 🌐 Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado (ej: `portfolio.avalob.com`):

1. Compra un dominio en Namecheap, GoDaddy, etc.
2. En GitHub → Settings → Pages → Custom domain, añade tu dominio
3. Configura los registros DNS en tu proveedor:
   ```
   Type: CNAME
   Name: www (o tu subdominio)
   Value: avalob.github.io
   ```
4. Espera a que se propague (puede tardar hasta 24h)

---

## 📊 Analíticas (Opcional)

Para trackear visitantes, puedes añadir:

### Google Analytics
1. Crea una propiedad en [Google Analytics](https://analytics.google.com/)
2. Obtén tu ID de medición (G-XXXXXXXXXX)
3. Añade en `frontend/index.html` antes de `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Alternativas simples:
- [Plausible Analytics](https://plausible.io/) - Privacy-focused
- [Umami](https://umami.is/) - Open source y self-hosted

---

## 🎉 ¡Listo!

Tu portfolio interactivo ya está desplegado y accesible desde:
**https://avalob.github.io/portfolio/**

Comparte el enlace en:
- ✅ LinkedIn (perfil y publicaciones)
- ✅ GitHub bio y README de tu perfil
- ✅ CV digital
- ✅ Redes sociales profesionales

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa los logs de GitHub Actions
2. Verifica la consola del navegador
3. Consulta la documentación de [GitHub Pages](https://docs.github.com/es/pages)
4. Abre un issue en el repositorio

**¡Mucha suerte con tu portfolio! 🚀✨**
