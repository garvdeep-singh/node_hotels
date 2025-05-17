// console.log("Server is running");



// // var result = add(5, 3);
// // console.log("The result is: " + result);

// function callback(){
// console. log ('Garv is calling a callback function');
// }

// function add(num1, num2,callback) {
//     // return num1 + num2;
//     console.log('result: '+num1+num2);
//     callback();
// }

// // const add = function(a, b, callback){
// // var result = a+b;
// // Gonsole. log('result: '+result);
// // callback();

// // add (3,4, callback);
// add (3,4, ()=>{
//     console.log('Garv is calling a callback function');
// }
// );



// var fs = require('fs');
// var os = require('os');

// var user=os.userInfo();
// console.log(user);

// fs.appendFile('greet.txt', 'Hello '+user.username+'!', ()=>{
//     console.log('File created');
// }
// );

// var notes=require('./notes.js');

// console.log("Server is running");

// var age=notes.age;
// console.log("Age is: "+age);




//creating server using express

import express from 'express'

const app = express()
import db from './db.js';

// const menuItem = require('./models/menuItem.js');

import bodyParser from 'body-parser';

app.use(bodyParser.json());



// const db = require('./db.js');

app.get('/', (req, res) => {
  res.send('Hello Sir......Welcome to our hotel')
})

app.get('/chicken', (req, res) => {
  res.send('Sure Sir I would love to serve you chicken')
}
)

app.get('/idli', (req, res) => {
  res.send('Sure Sir I would love to serve you idli')
}
)

app.get('/item', (req, res) => {
  res.send('Sure Sir I would love to serve you item')
}
)





// const personRoutes = require('./Routes/personRoutes.js');
import personRoutes from './Routes/personRoutes.js';
app.use('/person', personRoutes);

import menuItemRoutes from './Routes/menuItemRoutes.js';
app.use('/menuItem', menuItemRoutes);

app.listen(3000,() => {
  console.log('Server is running on port 3000')
}
)





// const data = req.body;
//   const newPerson=new Person(data);
//   newPerson.save((error,savedperson)=>{
//     if(error){
//       console.log("Error is coming");
//       res.status(500).json(error,"Internal server error");
//     }else{
//       console.log("Data saved successfully");
//       res.status(200).json(savedperson);
//     }
//   })