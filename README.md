# Examen Sociología - Centuria

## Despliegue en GitHub Pages

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Click **"New repository"**
3. Nombre: `examen-sociologia-centuria`
4. Público / Privado según prefieras
5. Click **"Create repository"**

### Paso 2: Subir archivos

```bash
# En tu terminal, dentro de la carpeta Examen_Virtual:
git init
git add .
git commit -m "Examen Sociología - Centuria"

# Reemplaza con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/examen-sociologia-centuria.git

git push -u origin main
```

### Paso 3: Habilitar GitHub Pages

1. En tu repositorio, ve a **Settings**
2. En el menú lateral: **Pages**
3. En "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** → **/(root)**
4. Click **Save**
5. Espera 1-2 minutos
6. Tu sitio estará en: `https://TU_USUARIO.github.io/examen-sociologia-centuria/`

---

## Notas Importantes

- **LocalStorage**: Los datos se almacenan en el navegador del estudiante. Para un panel docente en tiempo real real, se necesitaría un backend.
- **CDN externo**: El examen usa CDN para Tailwind CSS y Font Awesome. Requiere conexión a internet.
- **Seguridad**: Los exámenes son client-side, no hay protección contra trampas.

## Credenciales

- **Panel Docente**: C.I. `1340130`
- **Prueba**: C.I. `99`

## Estructura

```
Examen_Virtual/
├── Index.html          # Examen principal
├── 60_Preguntas_Sociologia.md
├── vercel.json         # Config Vercel
└── package.json        # Config npm
```

---

## Actualizar cambios

```bash
git add .
git commit -m "Actualización"
git push
```

El sitio se actualizará automáticamente en GitHub Pages.