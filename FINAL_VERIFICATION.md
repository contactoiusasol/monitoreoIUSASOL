# 🔍 VERIFICACIÓN FINAL ANTES DE DESPLIEGUE

Este documento es tu checklist para verificar que todo está listo.

## ✅ PASO 1: Verificación Local

### 1.1 Proyecto buildea correctamente

```bash
npm run build
```

Resultado esperado:
- ✅ Sin errores
- ✅ Menciona `dist/index.html`
- ✅ Muestra tamaño de archivos CSS y JS
- ✅ Output: `built in X.XXs`

### 1.2 Carpeta dist/ existe y tiene contenido

Abre el explorador de archivos:
```
📁 monitoreoIUSASOL/
  └── 📁 dist/
      ├── 📄 index.html       ← ✅ Debe existir
      ├── 🔧 .htaccess        ← ✅ Debe existir (puede estar oculto)
      └── 📁 assets/          ← ✅ Debe existir
          ├── *.css
          └── *.js
```

### 1.3 Archivo .htaccess es correcto

Abre `dist/.htaccess` con Notepad:

```
Debe contener:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /carpatin-dashboard-free/
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [QSA,L]
</IfModule>
```

- [ ] `mod_rewrite.c` está presente
- [ ] `RewriteEngine On` está presente
- [ ] `RewriteBase` tiene tu directorio correcto
- [ ] `RewriteRule` redirige a index.html

### 1.4 .env.local tiene credenciales

Verifica `c:\Users\Administracion\Desktop\monitoreoIUSASOL\monitoreoIUSASOL\.env.local`:

```
Debe tener:
VITE_SUPABASE_URL=https://xfyznfdbxufrrpkeqrpe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- [ ] VITE_SUPABASE_URL no es placeholder
- [ ] VITE_SUPABASE_ANON_KEY tiene contenido largo
- [ ] Sin espacios al inicio/final

### 1.5 Tamaño de archivos es razonable

En `dist/`:
- [ ] index.html: 1-2 KB
- [ ] CSS: 3-5 KB
- [ ] JS: 1+ MB
- [ ] Total: 1-2 MB sin comprimir

Si mucho más grande:
- Hay código sin usar
- Posible error en build

Si mucho más pequeño:
- Posible que falte código
- Ejecuta `npm run build` nuevamente

## ✅ PASO 2: Verificación en WinSCP

### 2.1 Conexión al servidor

- [ ] WinSCP abierto y conectado
- [ ] Archivos del servidor visibles
- [ ] Puedes navegar sin problemas

### 2.2 Estructura de carpetas correcta

En el servidor:
```
public_html/
└── carpatin-dashboard-free/
    ├── index.html       ← ✅ Visible
    ├── .htaccess        ← ✅ Visible (habilita "mostrar ocultos")
    ├── assets/
    │   ├── *.css
    │   └── *.js
    └── (otros archivos si existen)
```

- [ ] Carpeta `carpatin-dashboard-free` existe
- [ ] `index.html` está adentro
- [ ] `.htaccess` está presente (menú Ver → Mostrar archivos ocultos)
- [ ] `assets/` está completa

### 2.3 Permisos de archivos

En WinSCP: Click derecho en archivos → Propiedades

- [ ] index.html: 644 (read-write para propietario, read para otros)
- [ ] .htaccess: 644
- [ ] assets/: 755 (carpeta)
- [ ] Archivos en assets/: 644

### 2.4 Archivos subidos completamente

Verifica que TODOS estos archivos están:

- [ ] `index.html`
- [ ] `.htaccess`
- [ ] `assets/index-XXXX.css` (cualquier hash)
- [ ] `assets/index-XXXX.js` (cualquier hash)

## ✅ PASO 3: Verificación en Apache

### 3.1 mod_rewrite está activo

En cPanel / Hosting:

- [ ] Accede a cPanel
- [ ] Busca "Module Managers" o "Administrador de módulos"
- [ ] Busca `mod_rewrite` en la lista
- [ ] Está con ✅ (habilitado)
- Si no: habilita y reinicia Apache

### 3.2 .htaccess se aplica

En línea de comandos (si tienes acceso SSH):
```bash
cd public_html/carpatin-dashboard-free
cat .htaccess
```

Debe mostrar el contenido. Si falla:
- [ ] .htaccess no está en el lugar correcto
- [ ] No tiene permisos de lectura

### 3.3 Intentar acceso directo a archivos

En navegador prueba:
- [ ] `https://tu-dominio.com/carpatin-dashboard-free/index.html` → ¿Se ve?
- [ ] `https://tu-dominio.com/carpatin-dashboard-free/assets/index-XXXX.js` → ¿Código JavaScript?

Si sí: Los archivos están. Si no: No se subieron correctamente.

## ✅ PASO 4: Pruebas Funcionales

### 4.1 Acceso principal

En navegador: `https://tu-dominio.com/carpatin-dashboard-free`

- [ ] La página carga (no error 404)
- [ ] Ves pantalla de carga por 2-3 segundos
- [ ] Luego ves página de login

### 4.2 Sin errores en consola

Abre: F12 → Pestaña Console

- [ ] Sin errores rojos
- [ ] Sin advertencias de CORS
- [ ] Solo mensajes normales

### 4.3 Estilos cargan

En la página de login:

- [ ] Colores están presentes
- [ ] Botones están estilizados
- [ ] Typography es clara
- [ ] No se ve HTML sin estilos

Si todo es blanco y feo:
- [ ] CSS no cargó
- [ ] Revisa Network en F12
- [ ] Busca archivos .css con error 404

### 4.4 Funcionalidades trabajan

- [ ] Click en "Regístrate aquí" → Cambia a página de signup
- [ ] Click en "Inicia sesión aquí" → Vuelve a login
- [ ] Campos de email y contraseña son interactivos
- [ ] Avatar en top-right es clickeable
- [ ] Puedes escribir en los campos

### 4.5 Funcionamiento del login

**Registrar usuario nuevo:**
1. Haz click en "Regístrate aquí"
2. Ingresa: tu-email@ejemplo.com
3. Ingresa: contraseña123
4. Confirma: contraseña123
5. Click "Registrarse"

Resultado esperado:
- [ ] Mensaje de éxito
- [ ] Redirige a login automáticamente

**Iniciar sesión:**
1. Ingresa email y contraseña del usuario nuevo
2. Click "Iniciar Sesión"

Resultado esperado:
- [ ] Se carga dashboard
- [ ] Ves "Reports" en la página
- [ ] Menu lateral está visible
- [ ] Top-nav muestra tu email

### 4.6 Navegación

En el dashboard:
- [ ] Click en "Orders" → Carga página de órdenes
- [ ] Click en "Settings" → Carga página de configuración
- [ ] Click en "Theme" → Carga página de tema
- [ ] Click en "Icons" → Galería de iconos
- [ ] Botón atrás del navegador funciona
- [ ] URLs cambian correctamente

### 4.7 Logout

En top-right, click en avatar:
- [ ] Menú aparece
- [ ] Muestra tu email
- [ ] "Cerrar Sesión" es clickeable
- [ ] Al hacer click:
  - [ ] Sesión se cierra
  - [ ] Redirige a login
  - [ ] Ya no puedes acceder a dashboard

## ✅ PASO 5: Verificación de Errores

### 5.1 Consola del navegador (F12)

Busca cualquier error rojo. Si hay:

**Error: "Cannot find module"**
- Archivo no se subió completamente
- Vuelve a subir `dist/`

**Error: "Cannot GET /carpatin-dashboard-free/orders"**
- .htaccess no funciona
- Verifica que está presente
- Verifica RewriteBase es correcto
- Habilita mod_rewrite

**Error: "Supabase error"**
- Credenciales incorrectas
- Proyecto Supabase no activo
- Revisa .env.local

**Error: CORS**
- Problema con Supabase
- Configura CORS en Supabase

### 5.2 Tab Network (F12)

En la página de login:

1. Abre F12
2. Ve a pestaña Network
3. Recarga la página (F5)
4. Busca:
   - [ ] `index.html` → Status 200
   - [ ] `index-XXXX.css` → Status 200
   - [ ] `index-XXXX.js` → Status 200
   - [ ] Peticiones a supabase.co → Status 200

Si algún archivo es 404:
- No está subido
- Directorio es diferente
- Ruta en .htaccess es incorrecta

## ✅ PASO 6: Checklist Final

Antes de considerar listo:

- [ ] Build local ejecutado
- [ ] dist/ tiene todos los archivos
- [ ] .htaccess es correcto
- [ ] Archivos subidos via WinSCP
- [ ] .htaccess subido y visible
- [ ] mod_rewrite habilitado
- [ ] URL principal carga
- [ ] Login aparece
- [ ] Registro funciona
- [ ] Login funciona
- [ ] Dashboard se ve
- [ ] Navegación funciona
- [ ] Logout funciona
- [ ] Consola sin errores rojos
- [ ] Network muestra status 200 para assets
- [ ] Supabase conectado (si hay login funcional)

## 🎯 Si Todo está ✅

**¡Felicidades! Tu aplicación está en producción.**

- Usuarios pueden acceder a: `https://tu-dominio.com/carpatin-dashboard-free`
- Sistema de login funciona
- Dashboard completo disponible

## 🆘 Si Algo Falla

1. Revisa el paso donde falló
2. Abre consola (F12) y busca errores
3. Verifica Network para archivos 404
4. Revisa que .htaccess está subido
5. Comprueba permisos en servidor

---

**Importante:** Esta checklist es exhaustiva. Si pasas todos estos checks, ¡tu despliegue será exitoso!
