// const mongoose= require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//defining mongodb connection URL

// const mongoURL='mongodb://localhost:27017/hotels';
const mongoURL=process.env.MONGODB_URL_LOCAL 
// const mongoURL=process.env.MONGODB_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const db=mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('connected', () => {
    console.log('MongoDB connected');
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
}
)

// module.exports = db;
export default db;