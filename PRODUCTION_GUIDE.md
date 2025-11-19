# 🚀 Despliegue en Producción - Apache + WinSCP

## ⚡ Inicio Rápido

```bash
# 1. Prepara todo
node deploy.js

# Esto:
# ✅ Verifica .env.local
# ✅ Ejecuta npm run build
# ✅ Genera checklist de despliegue
# ✅ Muestra estructura de carpetas
```

## 📁 Carpeta para Subir

**Sube TODO el contenido de la carpeta `dist/` a tu servidor:**

```
dist/
├── index.html          ← Archivo principal
├── .htaccess          ← Configuración Apache (IMPORTANTE)
└── assets/            ← Estilos y scripts
    ├── index-XXXX.css
    └── index-XXXX.js
```

## 📍 Dónde Subir

**OPCIÓN 1: Subdirectorio (RECOMENDADO)**
```
public_html/carpatin-dashboard-free/
                ↓
        (sube dist/ aquí)
```

**OPCIÓN 2: Raíz del servidor**
```
public_html/
        ↓
    (sube dist/ aquí)
```

## 🔧 Pasos en WinSCP

1. **Abre WinSCP**
2. **Conecta a tu servidor**
3. **Navega a `public_html/`**
4. **Si usas subdirectorio:**
   - Crea carpeta: `carpatin-dashboard-free`
   - Entra en la carpeta
5. **Arrastra y suelta** la carpeta `dist/` completa
6. **Verifica:**
   - Que `index.html` esté
   - Que `.htaccess` esté (puede estar oculto)
   - Que `assets/` esté con sus archivos

## ⚠️ Importante: .htaccess

El archivo `.htaccess` es **CRÍTICO** para que React Router funcione.

- **Debe estar** en el mismo directorio que `index.html`
- **Puede estar oculto** en WinSCP
  - Menú → Ver → Mostrar archivos ocultos
- **Contenido:**
  ```
  RewriteEngine On
  RewriteBase /carpatin-dashboard-free/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
  ```

**Si cambias la carpeta, actualiza `RewriteBase`:**
- Si usas `/dashboard/` → `RewriteBase /dashboard/`
- Si usas raíz `/` → `RewriteBase /`

## 🔑 Variables de Supabase

Las credenciales de Supabase ya están compiladas en los archivos JavaScript.

**NO necesitas:**
- Subir `.env.local`
- Crear variables de entorno en el servidor
- Configurar nada en el servidor

**Nota:** Si cambias de credenciales de Supabase:
1. Actualiza `.env.local` localmente
2. Ejecuta `npm run build`
3. Sube `dist/` nuevamente

## ✅ Verificar Despliegue

**Accede a tu sitio:**
- `https://tu-dominio.com/carpatin-dashboard-free`

**Deberías ver:**
1. Pantalla de carga (2-3 segundos)
2. Página de login

**Pruebas:**
- [ ] Página de login aparece
- [ ] Puedo registrarme
- [ ] Puedo iniciar sesión
- [ ] Puedo navegar entre secciones
- [ ] Estilos cargan correctamente
- [ ] Consola (F12) no muestra errores rojos

## 🐛 Si algo no funciona

### Página en blanco
```
1. Abre consola: F12
2. Busca errores en rojo
3. Verifica .htaccess esté subido
4. Comprueba mod_rewrite está activo
```

### Archivos no cargan (CSS/JS rotos)
```
1. En consola (F12) → Network
2. Busca archivos con estado 404
3. Verifica que assets/ está completo
4. Revisa ruta correcta en vite.config.mts
```

### Login no funciona
```
1. Consola (F12) → Network
2. Busca peticiones a supabase.co
3. Si están en rojo, revisa credenciales
4. Verifica Supabase está activo en tu proyecto
```

### Redireccionamientos rotos
```
1. Verifica .htaccess está en su lugar
2. Revisa RewriteBase coincida con tu directorio
3. Comprueba que mod_rewrite está activo en Apache
```

## 📋 Checklist Final

- [ ] `.env.local` configurado localmente
- [ ] `npm run build` ejecutado sin errores
- [ ] Carpeta `dist/` tiene:
  - [ ] `index.html`
  - [ ] `.htaccess`
  - [ ] `assets/` con archivos
- [ ] WinSCP conectado al servidor
- [ ] Archivos subidos a `public_html/carpatin-dashboard-free/`
- [ ] `.htaccess` subido y visible
- [ ] RewriteBase en `.htaccess` es correcto
- [ ] mod_rewrite habilitado en Apache
- [ ] Acceso a URL funciona
- [ ] Login aparece sin errores
- [ ] Consola (F12) limpia de errores rojos

## 🎯 Resumen

```
npm run build → Generar dist/
                    ↓
            Subir dist/ vía WinSCP
                    ↓
            Verificar .htaccess
                    ↓
            Acceder a URL
                    ↓
            ¡Listo en producción!
```

## 📞 Problemas Comunes

| Problema | Solución |
|----------|----------|
| Página en blanco | Verifica .htaccess, revisa consola |
| CSS/JS no cargan | Comprueba carpeta assets/ está completa |
| 404 en navegación | Revisa .htaccess y RewriteBase |
| Login falla | Verifica credenciales Supabase |
| Errores CORS | Verifica VITE_SUPABASE_URL es correcto |

---

**¿Necesitas ayuda?** Revisa `DEPLOYMENT_GUIDE.md` para instrucciones detalladas.
