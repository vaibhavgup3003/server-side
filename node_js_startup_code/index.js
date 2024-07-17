const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const conn_url = "mongodb+srv://goyalvaibhav633:Vaibhav30@@cluster0.vwilxjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect('mongodb+srv://goyalvaibhav633:J3XH1Sg5emgqgk2f@cluster0.vwilxjn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', (error) => console.error());
db.once('open', () => console.log('Connected to database'));

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.put('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndUpdate(id, { $set: {name: "new name"}}, {new: true});
  res.json('Update Successfully');

});
app.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json('Deleted Successfully');
})
app.get('/', async (req,res) => {
  const users = await User.find();
  // const {name, age, email} = req.body
  // const newUser = new User({name: name, age: age, email: email});
  // newUser.save();
  // const dataFromClient = req.body
  // const username = req.body.username
  // console.log(dataFromClient);
  // if(username == 'naseef'){
  //   res.json('user is logged in');
  // }
  // else{
  //   res.json('user is not logged in');
  // }
  // console.log(username);
  // res.json('Hello api is working');
  res.json(users);
});
// mongoose.connect('mongodb+srv://naseefvaliyakath:Q6sMkCWaGIQ3VQ75@cluster0.kw5q1wg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to Database'));


// app.delete('/:id', async (req, res) => {
//   const id = req.params.id;
//  await User.findByIdAndDelete(id);
//   res.json('Delete successfully');
// });

// //TODO:  this


app.listen(port, () => {
  console.log(`Server is running on :${port}`);
});



const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: String,
  age: Number,
  email: String
});
const User = model('User', userSchema);