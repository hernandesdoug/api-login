const dotenv = require("dotenv");
const path = require("path");
const sequelize = require('../config/database');

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRoutes);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

const PORT = process.env.PORT || 3333;
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    console.log("Servidor rodando e tabelas prontas!");
  });
}).catch((err) => {
  console.error("Erro ao sincronizar o banco:", err);
});