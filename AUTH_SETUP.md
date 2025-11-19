# Configuración de Autenticación con Supabase

## Pasos para configurar la autenticación

### 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Toma nota de:
   - **Project URL** (VITE_SUPABASE_URL)
   - **Anon Key** (VITE_SUPABASE_ANON_KEY)

### 2. Configurar variables de entorno

En la raíz del proyecto, abre o crea el archivo `.env.local` y actualiza:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Habilitar autenticación por email/contraseña en Supabase

1. En tu proyecto de Supabase, ve a **Authentication** → **Providers**
2. Asegúrate que **Email** está habilitado
3. Configura las opciones según tus necesidades (auto-confirmación, etc.)

### 4. Crear usuarios de prueba (opcional)

Puedes crear usuarios manualmente en Supabase:
1. Ve a **Authentication** → **Users**
2. Haz clic en **Add user**
3. Ingresa email y contraseña

O permite que los usuarios se registren usando la página `/signup`

## Estructura del Sistema de Autenticación

### Archivos creados:

- **`src/lib/supabase.js`** - Cliente de Supabase
- **`src/contexts/auth-context.jsx`** - Context para gestionar autenticación
- **`src/pages/login.jsx`** - Página de inicio de sesión
- **`src/pages/signup.jsx`** - Página de registro
- **`src/components/private-route.jsx`** - Componente para proteger rutas

### Archivos modificados:

- **`src/app.jsx`** - Agregado AuthProvider
- **`src/routes.jsx`** - Agregadas rutas de login/signup y protección de rutas
- **`src/layouts/dashboard/top-nav.jsx`** - Agregado botón de logout

## Flujo de autenticación

1. Usuario no autenticado accede a `/` → Redirige a `/login`
2. Usuario inicia sesión → Se guarda en el contexto y puede acceder al dashboard
3. Usuario hace click en avatar → Menú con opción de logout
4. Logout → Limpia sesión y redirige a `/login`

## Hook de autenticación

En cualquier componente puedes usar el hook `useAuth()`:

```jsx
import { useAuth } from 'src/contexts/auth-context';

function MyComponent() {
  const { user, isAuthenticated, logout, login } = useAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Hola, {user.email}</p>}
    </div>
  );
}
```

## Métodos disponibles

- **`login(email, password)`** - Iniciar sesión
- **`signup(email, password)`** - Registrar nuevo usuario
- **`logout()`** - Cerrar sesión
- **`user`** - Usuario actual (null si no está autenticado)
- **`isAuthenticated`** - Booleano de autenticación
- **`isLoading`** - Indica si hay operación en curso
- **`error`** - Último error ocurrido

## Próximos pasos opcionales

- Implementar recuperación de contraseña
- Agregar autenticación social (Google, GitHub, etc.)
- Personalizar perfiles de usuario
- Agregar verificación de email
