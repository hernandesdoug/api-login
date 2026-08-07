const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const usersRoutes = require('./routes/users.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(usersRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

module.exports = app;
