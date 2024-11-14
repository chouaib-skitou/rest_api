const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Swagger setup
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Rest API Documentation',
        version: '1.0.0',
        description: 'API documentation for the Rest API project',
      },
      servers: [
        {
          url: 'http://localhost:5000/api',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API docs (make sure it's correct)
  };
  

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Server is running');
});

module.exports = app;
