# 🚀 DESPLIEGUE A PRODUCCIÓN - GUÍA COMPLETA

**Proyecto:** monitoreoIUSASOL - Dashboard con autenticación Supabase
**Servidor:** Apache + WinSCP
**Estado:** ✅ Listo para producción

---

## 📋 Índice de Documentación

1. **PRODUCTION_GUIDE.md** - Guía principal de despliegue (LÉELO PRIMERO)
2. **DEPLOYMENT_GUIDE.md** - Instrucciones detalladas paso a paso
3. **BUILD_STRUCTURE.md** - Explicación de la estructura compilada
4. **FINAL_VERIFICATION.md** - Checklist completo de verificación
5. **AUTH_SETUP.md** - Configuración de Supabase (si necesitas cambiarla)

---

## ⚡ Inicio Rápido (3 Pasos)

### 1️⃣ Compilar
```bash
npm run build
```

**Resultado:** Carpeta `dist/` con todo listo

### 2️⃣ Subir
Con WinSCP:
- Conecta a tu servidor Apache
- Navega a `public_html/`
- Crea carpeta: `carpatin-dashboard-free`
- Sube TODO de `dist/` adentro

### 3️⃣ Acceder
```
https://tu-dominio.com/carpatin-dashboard-free
```

---

## 🎯 Lo Que Necesitas

### ✅ Ya está incluido
- [x] Build optimizado en `dist/`
- [x] Archivo `.htaccess` configurado
- [x] Componentes de autenticación
- [x] Sistema de rutas protegidas
- [x] Documentación completa

### ⚠️ Debes verificar
- [ ] `.env.local` tiene credenciales de Supabase
- [ ] `npm run build` ejecutó sin errores
- [ ] Tienes acceso WinSCP a tu servidor
- [ ] Tu servidor tiene mod_rewrite habilitado

---

## 📁 Estructura de lo Que Subes

**Carpeta a subir:** `dist/`

```
dist/
├── index.html         ← Punto de entrada
├── .htaccess          ← Configuración Apache (CRÍTICO)
└── assets/
    ├── index-XXX.css  ← Estilos compilados
    └── index-XXX.js   ← Código compilado
```

**En el servidor debe quedar:**

```
public_html/
└── carpatin-dashboard-free/
    ├── index.html
    ├── .htaccess
    └── assets/
```

---

## 🔧 Configuración Necesaria

### En tu máquina (ya está hecho)

✅ `src/lib/supabase.js` - Cliente Supabase
✅ `src/contexts/auth-context.jsx` - Manejo de sesión
✅ `dist/.htaccess` - Enrutamiento Apache
✅ `.env.local` - Variables de entorno

### En el servidor Apache

1. **mod_rewrite debe estar habilitado**
   - Accede a cPanel → Administrador de módulos Apache
   - Busca `mod_rewrite` y habilítalo

2. **.htaccess debe estar subido**
   - Archivo en `public_html/carpatin-dashboard-free/.htaccess`
   - Puede estar oculto (menú Ver → Mostrar ocultos en WinSCP)

---

## 🌐 URLs Después del Despliegue

| Función | URL |
|---------|-----|
| Principal | `https://tu-dominio.com/carpatin-dashboard-free` |
| Login | `https://tu-dominio.com/carpatin-dashboard-free/login` |
| Dashboard | `https://tu-dominio.com/carpatin-dashboard-free` (con sesión) |
| Órdenes | `https://tu-dominio.com/carpatin-dashboard-free/orders` |
| Configuración | `https://tu-dominio.com/carpatin-dashboard-free/settings` |

---

## 🔐 Seguridad - Variables de Entorno

### ✅ Sí está compilado en el build
- Credenciales de Supabase (anon key - es pública)
- Rutas y configuración
- Lógica de la aplicación

### ❌ No subas al servidor
- `.env.local` (no se sube, solo se usa localmente)
- `.env` archivos
- `node_modules/` (solo en desarrollo)

### 🔒 Protege en Supabase
- La anon key es pública (necesaria para el navegador)
- Usa Row Level Security (RLS) en Supabase para proteger datos
- Usa reglas de seguridad, no confíes solo en JavaScript

---

## 🧪 Verificación Pre-Despliegue

Antes de subir, verifica:

```
✅ .env.local configurado
✅ npm run build sin errores
✅ dist/ contiene:
   ✅ index.html
   ✅ .htaccess
   ✅ assets/ con archivos
✅ Tamaño total ~1.3 MB
✅ WinSCP funciona
✅ Acceso al servidor
```

---

## 📊 Tamaño del Despliegue

| Archivo | Tamaño |
|---------|--------|
| index.html | 1.41 KB |
| CSS | 3.11 KB |
| JavaScript | 1,290 KB |
| **Total sin comprimir** | **~1.3 MB** |
| **Total con gzip** | **~368 KB** |
| **Con caching navegador** | **~4 KB por carga** |

---

## 🚨 Problemas Comunes

### ❌ "Página en blanco"
```
1. Abre consola: F12
2. Busca errores rojos
3. Revisa que .htaccess está subido
4. Verifica mod_rewrite activo
```

### ❌ "Rutas no funcionan (404)"
```
1. .htaccess no subido
2. RewriteBase incorrecto
3. mod_rewrite no habilitado

Solución: Lee DEPLOYMENT_GUIDE.md paso 3
```

### ❌ "CSS/JS no cargan"
```
1. Abre F12 → Network
2. Busca archivos con error 404
3. Verifica carpeta assets/ está completa

Solución: Re-sube dist/ correctamente
```

### ❌ "Login no funciona"
```
1. Verifica credenciales Supabase
2. Abre F12 → Network
3. Busca peticiones a supabase.co
4. Si están en rojo, revisa URL y key

Solución: Actualiza .env.local y npm run build
```

---

## 📚 Documentación Disponible

- **PRODUCTION_GUIDE.md** - Guía principal
- **DEPLOYMENT_GUIDE.md** - Pasos detallados con cPanel
- **DEPLOYMENT_CHECKLIST.md** - Checklist antes de subir
- **BUILD_STRUCTURE.md** - Explicación técnica del build
- **FINAL_VERIFICATION.md** - Verificación completa post-despliegue
- **AUTH_SETUP.md** - Configuración de autenticación

---

## 🎯 Próximas Acciones

### Opción A: Todo automático
```bash
node deploy.js
```

### Opción B: Manual
1. Abre `PRODUCTION_GUIDE.md`
2. Sigue los pasos
3. Sube con WinSCP
4. Verifica con `FINAL_VERIFICATION.md`

---

## ✨ Features Incluidos

✅ Sistema de login con Supabase
✅ Registro de usuarios
✅ Protección de rutas
✅ Logout funcional
✅ Dashboard completo
✅ Navegación entre secciones
✅ Estilos Material Design
✅ Responsive design
✅ Gráficos con ApexCharts
✅ Búsqueda y filtros

---

## 🔗 Enlaces Útiles

- **Supabase:** https://supabase.com
- **Material-UI:** https://mui.com
- **React Router:** https://reactrouter.com
- **Vite:** https://vitejs.dev

---

## 📞 Soporte

Si encuentras problemas:

1. **Revisa la documentación** de tu caso específico
2. **Abre consola del navegador** (F12) para ver errores
3. **Verifica cada paso** en FINAL_VERIFICATION.md
4. **Comprueba permisos** en el servidor

---

## 🎉 Resumen

| Paso | Estado |
|------|--------|
| Build | ✅ `npm run build` completado |
| Optimización | ✅ Código minificado y comprimido |
| Documentación | ✅ Guías completas incluidas |
| Seguridad | ✅ .htaccess configurado |
| Verificación | ✅ Checklist disponible |
| **Listo?** | ✅ **SÍ** |

---

**Felicidades! Tu proyecto está listo para producción.** 🚀

Lee `PRODUCTION_GUIDE.md` para empezar.

---

*Última actualización: Noviembre 12, 2025*
