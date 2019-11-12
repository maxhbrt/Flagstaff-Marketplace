require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const massive = require("massive");

app.use(express.static(__dirname + "/../build"));

const {
    register,
    logout,
    userSession,
    login
} = require("./controller/userController");

const {
 getCart,
 addToCart,
 updateQuantity   
} = require('./controller/cartContoller');


app.use(express.json());
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
);

massive(CONNECTION_STRING).then(db => {
    console.log("database connected");
        app.set("db", db);
});

app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/user_session", userSession);
app.delete("/auth/logout", logout);

app.get("/api/getcart/:id",getCart);
app.post("/api/addtocart",addToCart);
app.put("/api/updatequantity/:id", updateQuantity);

app.get("/api/inventory", (req, res, next) => {
  const db = req.app.get("db");
  db.getInventory().then(inventory => 
    res.status(200).send(inventory)).catch( err => {
        res.status(500).send({errorMessage: "something went wrong"})
        console.log(err)
    })
});

app.get("/api/inventory/greens", (req, res, next) => {
    const db = req.app.get("db");
    db.get_inv_greens().then(inventory => 
      res.status(200).send(inventory)).catch( err => {
          res.status(500).send({errorMessage: "something went wrong"})
          console.log(err)
      })
  });

  app.get("/api/inventory/produce", (req, res, next) => {
    const db = req.app.get("db");
    db.get_inv_produce().then(inventory => 
      res.status(200).send(inventory)).catch( err => {
          res.status(500).send({errorMessage: "something went wrong"})
          console.log(err)
      })
  });

  app.get("/api/inventory/eggs", (req, res, next) => {
    const db = req.app.get("db");
    db.get_inv_eggs().then(inventory => 
      res.status(200).send(inventory)).catch( err => {
          res.status(500).send({errorMessage: "something went wrong"})
          console.log(err)
      })
  });




let port = SERVER_PORT || 4000;
app.listen(port, () => console.log(`up and running on port ${port}`));