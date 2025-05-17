import mongoose from 'mongoose';

// Define the schema for the person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
});

const Person = mongoose.model('Person', personSchema);
// Export the model
export default Person;
// module.exports = Person;