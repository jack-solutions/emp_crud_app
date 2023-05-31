const dotenv = require("dotenv")
dotenv.config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { userRoutes } = require("./routes/user");
const { errHandler } = require("./middlewares");
const { managementRoutes } = require("./routes/management");

require("./db/mongodb")


const port = process.env.PORT || 80;

app.use(cors());



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())

app.use("/*", (req, res, next) => {
    console.log("dds");
    res.set({ "Access-Control-Allow-Origin": "*" });
    next();
  });

// testing purpose
app.get("/", (req,res) => {
    return res.send("ok")
})

// Implementaion routes
userRoutes(app);
managementRoutes(app);


// Error Handler
app.use(errHandler)

app.listen(port, () => {
  console.log("  Server Connected with port " + port);
});