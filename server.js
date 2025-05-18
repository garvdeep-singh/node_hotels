

//creating server using express

import express from 'express'

const app = express()
import db from './db.js';
import dotenv from 'dotenv';
import passport from './auth.js';
dotenv.config();



app.use(passport.initialize());


import bodyParser from 'body-parser';

app.use(bodyParser.json());

//Middleware function
const logRequest = (req, res, next) => {
  console.log(`${new Date().toLocaleString()} Request made to: ${req.url}`);
  next();
}

// const db = require('./db.js');
app.use(logRequest);

const localauthmiddleware = passport.authenticate('local', { session: false })
app.get('/' , (req, res) => {
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
app.use('/person',localauthmiddleware, personRoutes);

import menuItemRoutes from './Routes/menuItemRoutes.js';
app.use('/menuItem', menuItemRoutes);


const PORT=process.env.PORT || 3000;
app.listen(PORT,() => {
  console.log('Server is running on port 3000')
}
)





