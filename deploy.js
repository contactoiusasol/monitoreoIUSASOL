#!/usr/bin/env node

/**
 * Script de despliegue para producción
 * Uso: node deploy.js
 * 
 * Este script:
 * 1. Verifica que .env.local existe
 * 2. Ejecuta npm run build
 * 3. Genera un resumen de lo que se debe subir
 * 4. Crea un archivo de checklist
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🚀 INICIANDO DESPLIEGUE A PRODUCCIÓN\n');

// Verificar .env.local
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ ERROR: No se encontró .env.local');
  console.error('Por favor crea .env.local con tus credenciales de Supabase');
  process.exit(1);
}

console.log('✅ Archivo .env.local encontrado');
console.log('✅ Variables de Supabase están configuradas\n');

// Ejecutar build
console.log('📦 Compilando aplicación para producción...\n');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build completado exitosamente\n');
} catch (error) {
  console.error('\n❌ Error en el build');
  process.exit(1);
}

// Verificar que dist existe
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('❌ ERROR: Carpeta dist no encontrada');
  process.exit(1);
}

// Contar archivos
const files = execSync(`find "${distPath}" -type f`).toString().split('\n').filter(Boolean);
const dirs = execSync(`find "${distPath}" -type d`).toString().split('\n').filter(Boolean);

console.log('📊 RESUMEN DEL BUILD\n');
console.log(`   Archivos: ${files.length}`);
console.log(`   Directorios: ${dirs.length}`);
console.log(`   Tamaño total: ${(fs.readdirSync(distPath, { recursive: true }).reduce((acc, file) => {
  try {
    const filePath = path.join(distPath, file);
    return acc + (fs.statSync(filePath).isFile() ? fs.statSync(filePath).size : 0);
  } catch {
    return acc;
  }
}, 0) / 1024).toFixed(2)} KB\n`);

// Crear checklist
const checklist = `# ✅ CHECKLIST DE DESPLIEGUE

## Antes de subir a producción

- [ ] Verificar que .env.local tiene las credenciales correctas de Supabase
- [ ] Probar localmente: npm run dev
- [ ] Verificar que el login funciona en desarrollo
- [ ] Asegurar que todas las rutas funcionan

## Subir archivos con WinSCP

- [ ] Abre WinSCP y conecta a tu servidor
- [ ] Navega a public_html/
- [ ] Crea carpeta: carpatin-dashboard-free
- [ ] Sube la carpeta dist/ completa dentro de carpatin-dashboard-free/
- [ ] Asegúrate de:
  - [ ] index.html está presente
  - [ ] .htaccess está presente (puede estar oculto)
  - [ ] Carpeta assets/ con todos los archivos
  - [ ] Todos los archivos tienen permisos de lectura (644 archivos, 755 directorios)

## Verificar en el servidor

- [ ] Habilitar mod_rewrite si no está activo
- [ ] Verificar que .htaccess tiene la RewriteBase correcta
- [ ] Acceder a https://tu-dominio.com/carpatin-dashboard-free
- [ ] Debe mostrar pantalla de carga, luego login
- [ ] Probar registro de usuario
- [ ] Probar login
- [ ] Verificar que la navegación funciona
- [ ] Abrir consola (F12) para ver si hay errores

## Solución de problemas

Si ves página en blanco:
- [ ] Abre consola (F12) y busca errores
- [ ] Verifica que los archivos se subieron correctamente
- [ ] Revisa que .htaccess está en su lugar
- [ ] Comprueba conexión a Supabase

Si no puedes hacer login:
- [ ] Verifica credenciales de Supabase
- [ ] Comprueba que Supabase está activo
- [ ] Revisa consola (F12) para ver peticiones fallidas

---

Fecha de despliegue: ${new Date().toLocaleString()}
`;

const checklistPath = path.join(__dirname, 'DEPLOYMENT_CHECKLIST.md');
fs.writeFileSync(checklistPath, checklist);

console.log('📋 Archivos para subir con WinSCP:\n');
console.log('   📁 dist/');
console.log('      ├── index.html');
console.log('      ├── .htaccess (IMPORTANTE)');
console.log('      └── assets/');
console.log('          ├── *.css');
console.log('          └── *.js\n');

console.log('🎯 PRÓXIMOS PASOS:\n');
console.log('   1. Abre WinSCP y conecta a tu servidor');
console.log('   2. Navega a: public_html/');
console.log('   3. Crea carpeta: carpatin-dashboard-free');
console.log('   4. Sube TODO de: ' + distPath);
console.log('   5. Verifica que .htaccess está (puede estar oculto)');
console.log('   6. Accede a: https://tu-dominio.com/carpatin-dashboard-free\n');

console.log('✅ ¡Listo para despliegue!\n');
console.log('Revisa DEPLOYMENT_CHECKLIST.md para una lista de verificación completa\n');
