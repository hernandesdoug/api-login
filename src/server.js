const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(usersRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Servidor executando na porta ${PORT}`);
})