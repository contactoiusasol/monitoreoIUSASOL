# 📤 GUÍA VISUAL PARA WINSCP

## Paso 1: Abre WinSCP

1. Descarga WinSCP: https://winscp.net
2. Instala la aplicación
3. Abre WinSCP

---

## Paso 2: Conectar al Servidor

En la ventana de "Conectar a sitio":

```
┌─ Login ────────────────────┐
│                            │
│ Host Name:  tu-servidor    │
│ User Name:  tu-usuario     │
│ Password:   tu-contraseña  │
│                            │
│  [Conectar]                │
└────────────────────────────┘
```

Consigue estas credenciales de:
- Tu proveedor de hosting
- Email de confirmación
- Panel de control (cPanel, Plesk, etc.)

---

## Paso 3: Navega a public_html

En el panel izquierdo (Árbol de directorios):

```
Servidor
├── home/
│   └── tu-usuario/
│       └── public_html/  ← HACES CLICK AQUÍ
│           └── (archivos de tu sitio)
```

**O directamente en "Ruta remota":**

```
Escribe: /home/tu-usuario/public_html
Presiona: Enter
```

---

## Paso 4: Crea Carpeta (Opcional)

**Si quieres subdirectorio** (RECOMENDADO):

1. Click derecho en la carpeta vacía
2. Nuevo → Directorio
3. Nombre: `carpatin-dashboard-free`
4. Haz doble click para entrar

**Resultado:**
```
public_html/
└── carpatin-dashboard-free/  ← Entras aquí
    └── (aquí subes dist/)
```

---

## Paso 5: Sube la Carpeta dist

### Opción A: Arrastra y Suelta (MÁS FÁCIL)

1. **Izquierda:** Abre tu PC (Local)
   - Ve a: `C:\Users\Administracion\Desktop\monitoreoIUSASOL\monitoreoIUSASOL`
   - Busca carpeta: `dist`

2. **Derecha:** Servidor (Remote)
   - Estás en `public_html/carpatin-dashboard-free/`

3. **Acción:** Arrastra `dist` desde izquierda a derecha

```
┌─ LOCAL ────────────┬─ SERVIDOR ──────────┐
│                    │                     │
│ 📁 dist ─────────→ │ 📁 carpatin-dash    │
│  ├── index.html    │  ├── index.html     │
│  ├── .htaccess     │  ├── .htaccess      │
│  └── assets/       │  └── assets/        │
│                    │                     │
└────────────────────┴─────────────────────┘
```

### Opción B: Panel de Transferencia

1. Click derecho en `dist/`
2. "Upload..." (o Copiar)
3. Selecciona dónde subir
4. Click "Transfer"

---

## Paso 6: Verifica que .htaccess está

En WinSCP, en la carpeta `carpatin-dashboard-free/`:

### Sin archivos ocultos:
```
carpatin-dashboard-free/
├── index.html      ✅
├── assets/         ✅
└── (no ves .htaccess) ⚠️
```

### Activa archivos ocultos:

**Menú → Ver → Mostrar archivos ocultos**

O presiona: **Ctrl+Alt+H**

### Con archivos ocultos:
```
carpatin-dashboard-free/
├── index.html      ✅
├── .htaccess       ✅ AHORA LO VES
└── assets/         ✅
```

---

## Paso 7: Verifica que TODO se subió

En WinSCP, hace click en cada carpeta/archivo:

```
☑️ index.html          ← Debe estar
☑️ .htaccess           ← Debe estar (oculto)
☑️ assets/
   ☑️ index-XXXX.css   ← Archivo CSS
   ☑️ index-XXXX.js    ← Archivo JavaScript
```

Si faltan archivos:
- Vuelve a arrastrar `dist/`
- O haz click en "Sincronizar"

---

## Paso 8: Permisos (Si tu servidor lo requiere)

En WinSCP:

Click derecho en cada archivo:
- Propiedades
- Permisos: `644` (lectura para todos)

```
-rw-r--r-- = 644
```

Carpetas: `755`

```
drwxr-xr-x = 755
```

---

## Verificación Visual en WinSCP

Cuando todo esté correcto, deberías ver:

```
LADO REMOTO (Servidor):
┌──────────────────────────────┐
│ public_html/                 │
│ └─ carpatin-dashboard-free/  │
│    ├─ index.html             │
│    ├─ .htaccess              │
│    └─ assets/                │
│       ├─ index-XXXX.css      │
│       └─ index-XXXX.js       │
└──────────────────────────────┘
```

---

## Solución de Problemas en WinSCP

### Problema: No veo .htaccess

**Solución:** Menú → Ver → Mostrar archivos ocultos

### Problema: No puedo conectar

**Verifica:**
- Host correcto
- Usuario correcto
- Contraseña correcta
- Puertos abiertos

### Problema: Permisos denegados

**Solución:**
- Contacta a tu hosting
- O sube con otro usuario
- O cambia permisos en cPanel

### Problema: Subida lenta

**Normal si:**
- Servidor lejos de ti
- Muchos archivos
- Conexión lenta

**Espera:**
- La barra de progreso se complete
- O usa "Sincronizar" en lugar de "Upload"

---

## Después de Subir

### 1. Accede a tu sitio

En navegador:
```
https://tu-dominio.com/carpatin-dashboard-free
```

### 2. Deberías ver

```
┌─────────────────────────┐
│                         │
│  ⏳ Cargando aplicación │
│     [Spinner]           │
│                         │
└─────────────────────────┘

(Espera 2-3 segundos)

┌─────────────────────────┐
│      BIENVENIDO         │
│   Inicia Sesión         │
│                         │
│ Email: [_____________]  │
│ Contraseña: [_________] │
│                         │
│   [Iniciar Sesión]      │
│                         │
│  ¿No tienes cuenta?     │
│  Regístrate aquí        │
└─────────────────────────┘
```

### 3. Prueba

- [x] Escribe email y contraseña
- [x] Haz click en "Iniciar Sesión"
- [x] Deberías entrar al dashboard

---

## Resumen Visual

```
┌─ TU PC ──────────────┬─ SERVIDOR APACHE ─────┐
│                      │                       │
│ 📁 dist/             │ public_html/          │
│  ├── index.html ────→│ ├── carpatin-dash..  │
│  ├── .htaccess ─────→│ │  ├── index.html    │
│  └── assets/ ───────→│ │  ├── .htaccess     │
│                      │ │  └── assets/       │
│  (Local)             │  (Servidor)          │
│                      │                       │
└──────────────────────┴───────────────────────┘

        ↓ WinSCP ↓
    (Arrastra dist/)

Resultado: Tu sitio en producción ✅
URL: https://tu-dominio.com/carpatin-dashboard-free
```

---

## Checklist Final

- [ ] WinSCP descargado e instalado
- [ ] Conectado al servidor
- [ ] En carpeta `public_html/`
- [ ] Creé carpeta `carpatin-dashboard-free`
- [ ] Subí carpeta `dist/` completa
- [ ] `.htaccess` está (con archivos ocultos activos)
- [ ] `index.html` está
- [ ] `assets/` está con archivos
- [ ] Cerré WinSCP
- [ ] Accedí a URL en navegador
- [ ] Veo pantalla de carga
- [ ] Luego veo página de login
- [ ] ¡Funciona! 🎉

---

**¡Éxito con tu despliegue!** 🚀

Si necesitas ayuda, revisa `FINAL_VERIFICATION.md` para solucionar problemas.
