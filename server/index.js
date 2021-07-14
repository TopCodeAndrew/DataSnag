require("dotenv").config();

const { response } = require("express");
const express = require("express");

const massive = require("massive");

const app = express();

const dataCntrl = require("./controllers/dataController");

const { CONNECTION_STRING, SERVER_PORT } = process.env;

app.use(express.json());

let cb = () => {
  console.log("hit");
};

app.get("/api/user_data", dataCntrl.getUserData);

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((dbInstance) => {
    console.log("DB ready");
    app.set("db", dbInstance);
    app.listen(SERVER_PORT, () =>
      console.log(`Running on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log("HERE", err));
