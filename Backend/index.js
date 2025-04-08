const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./route/taskRoute.js");
const db = require("./db/db.js");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", taskRoutes);

const port = 3600;
app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}`);
});
