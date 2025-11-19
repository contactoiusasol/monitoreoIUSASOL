@echo off
REM Script de despliegue para Windows
REM Este script prepara todo para subir a producción

echo.
echo =====================================
echo   DESPLIEGUE A PRODUCCION - MONITOREO
echo =====================================
echo.

REM Verificar .env.local
if not exist ".env.local" (
    echo.
    echo ERROR: No se encontro .env.local
    echo.
    echo Crea .env.local con tus credenciales de Supabase:
    echo.
    echo VITE_SUPABASE_URL=https://xfyznfdbxufrrpkeqrpe.supabase.co
    echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    echo.
    pause
    exit /b 1
)

echo [OK] Archivo .env.local encontrado
echo.

REM Ejecutar build
echo Compilando aplicacion para produccion...
echo.

cmd /c npm run build

if errorlevel 1 (
    echo.
    echo ERROR: El build fallo
    pause
    exit /b 1
)

echo.
echo =====================================
echo    BUILD COMPLETADO EXITOSAMENTE
echo =====================================
echo.

REM Mostrar estructura
echo [INFO] Archivos para subir:
echo.
echo   CARPETA: dist
echo   - index.html
echo   - .htaccess
echo   - assets/
echo       - *.css
echo       - *.js
echo.

REM Crear checklist
echo [INFO] Creando checklist de despliegue...

echo # CHECKLIST DE DESPLIEGUE > DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo ## Antes de subir >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo - [ ] .env.local configurado >> DEPLOYMENT_CHECKLIST.md
echo - [ ] npm run build ejecutado sin errores >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo ## WinSCP >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Conectar a servidor >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Navegar a public_html/ >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Crear carpeta carpatin-dashboard-free >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Subir contenido de dist/ >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Verificar .htaccess este presente >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo ## Verificar en servidor >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Acceder a https://tu-dominio.com/carpatin-dashboard-free >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Ver pantalla de carga >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Ver pagina de login >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Registrarse funciona >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Login funciona >> DEPLOYMENT_CHECKLIST.md
echo - [ ] Navegacion funciona >> DEPLOYMENT_CHECKLIST.md
echo. >> DEPLOYMENT_CHECKLIST.md

echo [OK] Checklist creado

echo.
echo =====================================
echo        PASOS PARA SUBIR CON WINSCP
echo =====================================
echo.
echo 1. Abre WinSCP
echo 2. Conecta a tu servidor Apache
echo 3. Navega a: public_html/
echo 4. Crea carpeta: carpatin-dashboard-free
echo 5. Entra en esa carpeta
echo 6. Arrastra la carpeta 'dist' desde tu PC
echo 7. Sube TODOS los archivos
echo 8. Verifica que .htaccess este (puede estar oculto)
echo    - Menu Ver / Mostrar archivos ocultos
echo.
echo 9. Accede a: https://tu-dominio.com/carpatin-dashboard-free
echo 10. Deberias ver la pagina de login
echo.

echo =====================================
echo          LISTO PARA DESPLIEGUE
echo =====================================
echo.
echo Carpeta a subir: %cd%\dist
echo.
echo Revisa DEPLOYMENT_CHECKLIST.md y PRODUCTION_GUIDE.md
echo.
pause
