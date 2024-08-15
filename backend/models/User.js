const mongoose = require('mongoose');

// Define the user schema
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: String,
    lastname: String
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model so it can be used in other parts of your application
module.exports = User;
