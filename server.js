const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
//connect to mongoose
mongoose
  .connect(
    "mongodb+srv://Prashraya:oversweet-essential@cluster0.cblu1tu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Db connected"))
  .catch(err => console.log(err.message));

const userSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  password: String,
});
//model

const User = mongoose.model("User", userSchema);
//view engine setup ejs
app.set("view engine", "ejs");

//static files
app.use(express.static("public"));

//pass json data
app.use(express.json());

//pass form data
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.render("index");
});

// get login form
app.get("/login", (req, res) => {
  res.render("login");
});

//login logic
app.post("/login", async (req, res) => {
  // res.render("login");
  //get the username and password
  let username = req.body.username;
  let userPassword = req.body.password;
  //find the user in mongodb

  // const userFound = await User.findOne({username: username})
  const userDocument = await User.findOne({password:userPassword, username})

  if(!userDocument){
    return res.json({
      msg:"Invalid login cerdentials"

    })
  }
  console.log("sucess")
  //API 
   res.json({
     msg:"Login Success",
     password,

   });
});

//get Register form
app.get("/register", (req, res) => {
  res.render("register");
});

//Register user
app.post("/register",  (req, res) => {
    User.create({
      fullName:req.body.fullName,
      username:req.body.username,
      password: req.body.password,
    }).then((user) => console.log(user)).catch((err) =>{console.log(err)});
});


//profile
app.get("/profile/:id", (req, res) => {
  res.render("profile");
});
//listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
