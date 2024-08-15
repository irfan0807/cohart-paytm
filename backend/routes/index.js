const express = require('express');
const bcrypt = require('bcrypt'); // Don't forget to require bcrypt
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const authToken = require('../middleware/Auth')

const router = express.Router();

// GET /user - Getting list of users (this is just a placeholder)
router.get('/user', async (req, res) => {
    const users =  await User.find({});
    return res.status(203).json({
        data:users
    })
});

// POST /user - Create a new user
router.post('/user', async (req, res) => {
    // Ensure all required fields are provided
    const { email, password, firstname, lastname } = req.body;
   
    
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            error: true,
            message: "All fields are required"
        });
    }

    try {
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "User already exists"
            });
        }

        // Hash the password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            firstname,
            lastname,
            password: hashPassword, // Save the hashed password
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        const tokenData = {
            _id : savedUser._id,
            email : savedUser.email,
        }
        const token = await jwt.sign(tokenData, "akjsgduasgd", { expiresIn: 60 * 60 * 8 });
        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        res.cookie("token",token,tokenOption);
        


        return res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });

    } catch (err) {
        console.error("Error while creating the user:", err);
        res.status(500).json({
            success: false,
            error: true,
            message: "Error while creating the new user"
        });
    }
});

module.exports = router;
