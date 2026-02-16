# Panel de Administración - Puma's Band

Sistema completo de autenticación y edición de textos con JWT y PostgreSQL.

## 📋 Requisitos Previos

1. **PostgreSQL** instalado y corriendo
2. **Node.js** (versión 18 o superior)
3. Base de datos PostgreSQL creada

## 🚀 Instalación

### 1. Instalar Dependencias

```bash
npm install jose postgres bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Configurar Base de Datos

Ejecuta el script SQL para crear las tablas:

```bash
psql -U tu_usuario -d tu_base_de_datos -f schema.sql
```

O copia el contenido de `schema.sql` y ejecútalo en tu cliente PostgreSQL.

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Admin credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_contraseña_aqui

# Secret Token (genera una clave aleatoria segura)
SECRET_TOKEN=tu_clave_secreta_muy_larga_y_aleatoria_aqui

# PostgreSQL connection
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_base_datos
```

**IMPORTANTE:** 
- Cambia `ADMIN_PASSWORD` por tu contraseña deseada
- Genera un `JWT_SECRET` aleatorio y seguro (mínimo 32 caracteres)
- Actualiza `DATABASE_URL` con tus credenciales de PostgreSQL

### 4. (Opcional) Hashear la Contraseña

Para mayor seguridad en producción, hashea tu contraseña:

```javascript
// Ejecuta esto en Node.js
const bcrypt = require('bcryptjs');
const password = 'tu_contraseña';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
```

Luego usa el hash generado en `ADMIN_PASSWORD` en el `.env`.

## 🎯 Uso

### Acceder al Panel de Admin

1. Visita: `http://localhost:4321/admin/login`
2. Ingresa tus credenciales configuradas en `.env`
3. Serás redirigido a `/admin`

### Editar Textos

1. En la página `/admin`, haz **doble click** sobre cualquier texto
2. Aparecerá un campo de edición
3. Modifica el texto
4. Presiona **Enter** o click en **Guardar**
5. El texto se guardará en la base de datos

### Cerrar Sesión

Click en el botón **"Cerrar Sesión"** en la esquina superior derecha.

## 📁 Estructura de Archivos Creados

```
src/
├── lib/
│   ├── auth.ts          # Funciones de autenticación
│   ├── db.ts            # Conexión y queries a PostgreSQL
│   └── jwt.ts           # Creación y verificación de JWT
├── pages/
│   ├── admin/
│   │   ├── index.astro  # Panel de admin con edición
│   │   └── login.astro  # Página de login
│   └── api/
│       ├── auth/
│       │   ├── login.ts    # POST /api/auth/login
│       │   ├── logout.ts   # POST /api/auth/logout
│       │   └── verify.ts   # GET /api/auth/verify
│       └── texts/
│           ├── index.ts    # GET /api/texts
│           └── [key].ts    # GET/PUT /api/texts/:key
└── components/
    ├── EditableText.tsx        # Componente React editable
    └── main/
        └── HeroEditable.tsx    # Hero con textos editables
```

## 🔒 Seguridad

- Las contraseñas se pueden almacenar hasheadas con bcrypt
- JWT con expiración de 24 horas
- Cookies httpOnly y secure en producción
- Todas las rutas de admin protegidas con autenticación
- API routes verifican autenticación antes de permitir ediciones

## 🗄️ Base de Datos

### Tabla: `editable_texts`

| Campo      | Tipo         | Descripción                    |
|------------|--------------|--------------------------------|
| id         | SERIAL       | ID único                       |
| key        | VARCHAR(255) | Identificador único del texto  |
| content    | TEXT         | Contenido del texto            |
| section    | VARCHAR(100) | Sección (hero, about, etc.)    |
| created_at | TIMESTAMP    | Fecha de creación              |
| updated_at | TIMESTAMP    | Fecha de última actualización  |

### Textos Iniciales

El script `schema.sql` crea estos textos por defecto:

- `hero.title`: "Puma's Band"
- `hero.subtitle`: "La mejor banda para tus eventos"
- `about.title`: "Sobre Nosotros"
- `about.description`: "Somos una banda profesional con años de experiencia"
- `services.title`: "Nuestro Repertorio"
- `contact.title`: "Reservas"

## 🐛 Solución de Problemas

### Error: "Cannot read properties of null"
- Verifica que las dependencias estén instaladas correctamente
- Ejecuta: `npm install jose postgres bcryptjs`

### Error: "DATABASE_URL is not defined"
- Asegúrate de tener el archivo `.env` en la raíz del proyecto
- Verifica que las variables estén correctamente definidas

### Error: "Invalid credentials"
- Verifica que `ADMIN_USERNAME` y `ADMIN_PASSWORD` en `.env` coincidan con lo que ingresas
- Si usas contraseña hasheada, asegúrate de que el hash sea correcto

### No se guardan los cambios
- Verifica la conexión a PostgreSQL
- Revisa los logs del servidor para errores
- Asegúrate de estar autenticado (cookie válida)

## 📝 Notas

- El sistema usa cookies httpOnly para almacenar el JWT
- Las sesiones expiran después de 24 horas
- Los textos se recargan automáticamente después de guardar
- El modo edición solo está disponible en `/admin`, no en la home pública

## 🔄 Próximos Pasos

Para extender el sistema:

1. **Agregar más textos editables**: Crea componentes editables similares a `HeroEditable.tsx`
2. **Gestión de usuarios**: Agregar tabla de usuarios en lugar de credenciales en `.env`
3. **Historial de cambios**: Agregar tabla de auditoría para rastrear cambios
4. **Subida de imágenes**: Implementar edición de imágenes además de textos
5. **Roles y permisos**: Sistema de roles para diferentes niveles de acceso
