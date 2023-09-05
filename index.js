// Using Node.js `require()`
// const mongoose = require('mongoose');
const express = require("express");
const app = express();
const basicAuth = require("./db/connect");
const bcrpyt = require("bcrypt");
const cors = require("cors");
const { setUser, authi } = require("./auth");
const cookie = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded())
app.use(cookie("kuchbhi"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(
  cors({
    origin: "*",
  })
);
app.use(authi);
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res, next) => {
  res.render("login.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
app.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  let crpytPass = await bcrpyt.hash(password, 10);
  const data = await new basicAuth({
    email: email,
    username: username,
    password: crpytPass,
  });
  // data.save();
  let token = setUser(data);
  res.cookie("jwtToken",token,{maxAge:1000*60}).redirect("/")
  
});

app.post("/login", async (req, res) => {
 
  let result = await basicAuth.findOne({ email: req.body.email });
  
  if (result == null) {
    res.json({ data: "not found" });
    return;
  }
  let comp = await bcrpyt.compare(req.body.password, result.password);

  if (comp) {
    
    const token = setUser(result);
    res.cookie("jwtToken", token, { maxAge: 1000 * 60 }).redirect("/");
    // const cookieString = cookie.serialize('jwtToken', token, cookieOptions);

    return;
  } else {
    res.status(401);
  }
});

app.put("/forgot/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
});
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
