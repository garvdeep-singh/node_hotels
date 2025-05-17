

//creating server using express

import express from 'express'

const app = express()
import db from './db.js';
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();

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


const PORT=process.env.PORT || 3000;
app.listen(PORT,() => {
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