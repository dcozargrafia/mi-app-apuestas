# API de Gestión de Apuestas

## Descripción
Esta API proporciona un sistema de gestión para casas de apuestas, apuestas y transacciones. Permite a los usuarios realizar un seguimiento de sus actividades de apuestas, gestionar múltiples casas de apuestas y registrar transacciones financieras relacionadas.

## Características
- Gestión de Casas de Apuestas
- Registro y seguimiento de Apuestas
- Gestión de Transacciones (Depósitos y Retiros)
- Documentación de API con Swagger

## Tecnologías Utilizadas
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Swagger para documentación de API

## Requisitos Previos
- Node.js (versión 14.0 o superior)
- PostgreSQL (versión 12.0 o superior)

## Instalación
1. Clonar el repositorio:
git clone https://github.com/tu-usuario/mi-app-apuestas.git
cd mi-app-apuestas

2. Instalar dependencias:
npm install

3. Configurar la base de datos:
- Crear una base de datos PostgreSQL
- Copiar el archivo `.env.example` a `.env` y actualizar las variables de entorno con tus credenciales de base de datos

4. Ejecutar migraciones:
npx sequelize-cli db:migrate

5. Iniciar el servidor:
npm run dev

## Uso
Una vez que el servidor esté en funcionamiento, puedes acceder a la API en `http://localhost:3000`.

Para ver la documentación de la API, visita `http://localhost:3000/api-docs`.

## Endpoints Principales

### Casas de Apuestas
- GET /api/casas-apuestas - Obtener todas las casas de apuestas
- POST /api/casas-apuestas - Crear una nueva casa de apuestas
- GET /api/casas-apuestas/:id - Obtener una casa de apuestas específica
- PUT /api/casas-apuestas/:id - Actualizar una casa de apuestas
- DELETE /api/casas-apuestas/:id - Eliminar una casa de apuestas

### Apuestas
- GET /api/apuestas - Obtener todas las apuestas
- POST /api/apuestas - Crear una nueva apuesta
- GET /api/apuestas/:id - Obtener una apuesta específica
- PUT /api/apuestas/:id - Actualizar una apuesta
- DELETE /api/apuestas/:id - Eliminar una apuesta

### Transacciones
- GET /api/transacciones - Obtener todas las transacciones
- POST /api/transacciones - Crear una nueva transacción
- GET /api/transacciones/:id - Obtener una transacción específica
- PUT /api/transacciones/:id - Actualizar una transacción
- DELETE /api/transacciones/:id - Eliminar una transacción

## Contribución
Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia
[MIT](https://choosealicense.com/licenses/mit/)