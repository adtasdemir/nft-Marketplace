const express = require('express');
const cors = require('cors');
const nftRoutes = require('./routes/nftRoutes');
const errorHandler = require('./middlewares/errorHandler');

const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure CORS
app.use(cors({
  origin: 'http://localhost:8081', 
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Middleware for JSON body parsing
app.use(express.json());

// Routes
app.use('/api/nfts', nftRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export app for testing
module.exports = app;
