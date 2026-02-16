@echo off
echo ========================================
echo Configuracion de Base de Datos PostgreSQL
echo ========================================
echo.

set /p PGUSER="Ingresa el usuario de PostgreSQL (por defecto 'postgres'): "
if "%PGUSER%"=="" set PGUSER=postgres

set /p PGPASSWORD="Ingresa la contrasena de PostgreSQL: "

echo.
echo Creando base de datos 'pumas_band'...
psql -U %PGUSER% -c "CREATE DATABASE pumas_band;"

if %errorlevel% equ 0 (
    echo.
    echo ✓ Base de datos creada exitosamente
    echo.
    echo Ejecutando schema.sql...
    psql -U %PGUSER% -d pumas_band -f schema.sql
    
    if %errorlevel% equ 0 (
        echo.
        echo ✓ Tablas creadas exitosamente
        echo.
        echo ========================================
        echo Configuracion completada
        echo ========================================
        echo.
        echo Ahora actualiza tu archivo .env con:
        echo DATABASE_URL="postgresql://%PGUSER%:%PGPASSWORD%@localhost:5432/pumas_band"
        echo.
    ) else (
        echo.
        echo ✗ Error al ejecutar schema.sql
    )
) else (
    echo.
    echo ✗ Error al crear la base de datos
    echo Nota: Si la base de datos ya existe, continua con el siguiente paso
)

pause
