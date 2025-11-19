# Guía de Despliegue en Producción - Apache con WinSCP

## 📋 Requisitos Previos

1. **Acceso a servidor Apache** vía WinSCP
2. **Variables de entorno configuradas** en `.env.local`
3. **Módulo mod_rewrite habilitado** en Apache (para enrutamiento)
4. **Node.js y npm instalados** en tu máquina local (ya los tienes)

## 🔧 Paso 1: Preparar el Build

El proyecto ya está compilado en la carpeta `dist/`. Para asegurar que tienes la última versión:

```bash
npm run build
```

Esto genera:
- `dist/index.html` - Archivo principal
- `dist/assets/` - Archivos CSS y JavaScript optimizados
- `dist/.htaccess` - Configuración de Apache para React Router

## 📤 Paso 2: Subir Archivos con WinSCP

### Opción A: Subir a subdirectorio (RECOMENDADO)

Si tu carpeta web es `public_html/`, crea una subcarpeta:

```
public_html/carpatin-dashboard-free/
```

**Pasos en WinSCP:**

1. Abre WinSCP y conecta a tu servidor
2. Navega a la carpeta `public_html/`
3. Crea una nueva carpeta llamada `carpatin-dashboard-free`
4. Entra en esa carpeta
5. Sube TODO el contenido de la carpeta `dist/` local:
   - index.html
   - .htaccess
   - carpeta assets/ (con todos los archivos)

### Opción B: Subir a raíz de public_html/ (ALTERNATIVO)

Si quieres que sea tu sitio principal:

1. En WinSCP, ve a `public_html/`
2. **PRIMERO**: Respaldá los archivos existentes
3. Borra todo (o muévelo a otra carpeta)
4. Sube los archivos de `dist/`:
   - index.html
   - .htaccess
   - carpeta assets/

## ⚙️ Paso 3: Configuración Apache

### Habilitar mod_rewrite (si no está habilitado)

1. Contacta a tu proveedor de hosting o accede a cPanel
2. Busca "Module Managers" o "Apache Modules"
3. Busca `mod_rewrite` y habilítalo
4. Si usas cPanel: Acciones → Reiniciar Apache

### Verificar .htaccess

El archivo `.htaccess` ya está incluido en `dist/`. Asegúrate de:

1. Subirlo con la carpeta dist/
2. Que sea visible en WinSCP (puede estar oculto)
   - En WinSCP: Menú → Ver → Mostrar archivos ocultos

### Si tu sitio está en subdirectorio (carpatin-dashboard-free)

El `.htaccess` está configurado correctamente con:
```
RewriteBase /carpatin-dashboard-free/
```

**Si lo subes a otro directorio, DEBES actualizar `.htaccess`:**

Por ejemplo, si usas `public_html/dashboard/`:
```
RewriteBase /dashboard/
```

O si es la raíz:
```
RewriteBase /
```

## 🌐 Paso 4: Configurar Variables de Entorno en Producción

Tu aplicación usa variables de entorno de Supabase. En producción, debes asegurarte de que sean accesibles.

### Opción A: Variables precompiladas (RECOMENDADO)

Las variables ya están compiladas en el build si las tenías en `.env.local`. Verifica:

1. Tu `.env.local` local tiene:
```
VITE_SUPABASE_URL=https://xfyznfdbxufrrpkeqrpe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Ejecutas `npm run build` DESPUÉS de configurar `.env.local`
3. Los valores ya están compilados en los archivos JS

### Opción B: Si necesitas cambiarlas después

Si necesitas cambiar Supabase en producción:

1. Actualiza `.env.local` localmente
2. Ejecuta `npm run build` nuevamente
3. Sube los archivos de `dist/` nuevamente

## ✅ Paso 5: Verificar Despliegue

Después de subir los archivos:

1. **Accede a tu sitio:**
   - Si está en subdirectorio: `https://tu-dominio.com/carpatin-dashboard-free`
   - Si está en raíz: `https://tu-dominio.com`

2. **Deberías ver:**
   - Pantalla de carga (2-3 segundos)
   - Página de login

3. **Prueba el funcionamiento:**
   - Haz click en "Regístrate aquí"
   - Crea una cuenta de prueba
   - Inicia sesión
   - Navega entre páginas
   - Verifica que los estilos se cargan correctamente

## 🐛 Solución de Problemas

### Problema: Página en blanco
- Abre consola del navegador (F12)
- Verifica si hay errores de conexión a Supabase
- Revisa que `.htaccess` está subido
- Verifica que mod_rewrite está habilitado

### Problema: Archivos CSS/JS no cargan
- Verifica la ruta en `vite.config.mts`
- La carpeta `assets/` debe estar en el mismo directorio que `index.html`
- En WinSCP, confirma que la carpeta `assets/` se subió completa

### Problema: Login no funciona
- Verifica que tu Supabase está configurado correctamente
- Abre consola (F12) → Network → ve si las peticiones a Supabase se envían
- Comprueba que `VITE_SUPABASE_ANON_KEY` es válido

### Problema: Redireccionamientos no funcionan
- El .htaccess no está en el lugar correcto
- mod_rewrite no está habilitado en Apache
- La RewriteBase en .htaccess no coincide con tu directorio real

## 📚 Estructura de carpetas esperada en el servidor

```
public_html/
├── carpatin-dashboard-free/    ← Nombre del directorio
│   ├── index.html
│   ├── .htaccess
│   └── assets/
│       ├── index-gjWrHuy6.css
│       └── index-cWUCdY38.js
│   └── (otros archivos CSS/JS)
└── (otros sitios/archivos)
```

## 🚀 Resumen Rápido

1. ✅ `npm run build` (ya hecho)
2. ✅ Abre WinSCP y conecta a tu servidor
3. ✅ Navega a `public_html/`
4. ✅ Crea carpeta `carpatin-dashboard-free/`
5. ✅ Sube todo de `dist/` a esa carpeta
6. ✅ Verifica que `.htaccess` esté (puede estar oculto)
7. ✅ Accede a `https://tu-dominio.com/carpatin-dashboard-free`
8. ✅ ¡Listo! Tu aplicación está en producción

## 📞 Soporte

Si encuentras problemas:

1. Abre la consola del navegador (F12)
2. Busca mensajes de error
3. Verifica que Supabase esté configurado correctamente
4. Comprueba permisos de archivos en el servidor

---

**Nota:** El archivo `.env.local` NO se sube al servidor. Las variables de Supabase ya están compiladas en los archivos JavaScript durante el build.
