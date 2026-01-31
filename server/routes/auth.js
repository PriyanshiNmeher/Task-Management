const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    // Force email to lowercase to match Schema definition and ensure consistency
    const email = req.body.email ? req.body.email.toLowerCase() : '';

    try {
        console.log(`Attempting to register user: ${username}, email: ${email}`);

        // Check if user exists by Email
        let userByEmail = await User.findOne({ email });
        if (userByEmail) {
            console.log('Registration failed: Email already exists');
            return res.status(400).json({ msg: 'User with this email already exists' });
        }

        // Check if user exists by Username
        let userByUsername = await User.findOne({ username });
        if (userByUsername) {
            console.log('Registration failed: Username already exists');
            return res.status(400).json({ msg: 'User with this username already exists' });
        }

        user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        console.log('User registered successfully');

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Register Error:', err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { password } = req.body;
    // Force email to lowercase
    const email = req.body.email ? req.body.email.toLowerCase() : '';

    try {
        console.log(`Attempting login for email: ${email}`);

        let user = await User.findOne({ email });

        if (!user) {
            console.log('Login failed: User not found');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('Login successful');

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error('Login Error:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
