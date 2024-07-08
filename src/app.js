const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize');
const CasaApuestas = require('./models/CasaApuestas');
const Apuesta = require('./models/Apuesta');
const apuestasRoutes = require('./routes/apuestas');
const casasApuestasRoutes = require('./routes/casasApuestas');
const transaccionesRoutes = require('./routes/transacciones');
const initDb = require('./initDb');

const app = express();
const PORT = process.env.PORT || 5000;

//Habilitar CORS para todas las rutas
app.use(cors());


app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Rutas
app.use('/api/apuestas', apuestasRoutes);
app.use('/api/casas-apuestas', casasApuestasRoutes);
app.use('/api/transacciones', transaccionesRoutes);

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
    return initDb();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al sincronizar la base de datos:', err));

  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API de Gestión de Apuestas',
        version: '1.0.0',
        description: 'API para gestionar casas de apuestas, apuestas y transacciones',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desarrollo',
        },
      ],
    },
    apis: ['./src/routes/*.js'], // archivos que contienen anotaciones
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));