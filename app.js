const express = require('express');
const app = express();
const mongooseconnection = require('./config/mongoose')
const userModel = require('./models/user')
const debuglog = require('debug')('development:app');

  
app.get("/", function(req, res,) {
    res.send("hello")
})

app.get("/create", async function(req, res, next) {
  let createuser = await userModel.create({
    username: "John Doe",
    name: "John",
    email: "johndoe@example.com",
    password: "secret"
  })

  debuglog("user created")
  res.send(createuser)
});

app.get("/read" ,async function( req, res, next ) {
   let users = await userModel.find()
   debuglog("readed");
   res.send(users);
})

app.get("/update", async function(req, res, next){
    let updateuser = await userModel.findOneAndUpdate({username: "John Doe"}, {name: "sultan"},{new: true});
    res.send(updateuser);
});

app.get("/delete", async function (req, res) {
    let deleteuser = await userModel.findOneAndDelete({username:"John Doe"})
    res.send(deleteuser);
});


app.listen(3000);