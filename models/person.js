import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next) {
    // const person = this;
    try{if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();}
    catch (error) {
        next(error);
    }
});

personSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing password');
    }
}
const Person = mongoose.model('Person', personSchema);
// Export the model
export default Person;
// module.exports = Person;