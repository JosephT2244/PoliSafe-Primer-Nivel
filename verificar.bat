@echo off
rem Un código de: Joseph Ubaldo Trejo Hernandez
rem Construye el sitio (copia el APK de entregables) y corre sus pruebas.
cd /d "%~dp0"
call npm install || exit /b 1
call npm run build || exit /b 1
call npm test || exit /b 1
echo Sitio listo en la carpeta dist
