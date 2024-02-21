const express = require('express');
const { UserCred } = require("../database/db");
const userRouter = express();
const jwt = require('jsonwebtoken');
const key = "AniketBhaiLikesBhabhi";

function tokenMaker(data) {
    const token = jwt.sign({ username: data.username }, key);
    return token;
}

userRouter.post("/signup", (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    UserCred.findOne({ username })
        .then((value) => {
            if (value) {
                res.json({ msg: "User already exists" });
            } else {
                UserCred.create({ username, firstname, lastname, password })
                    .then((createdUser) => {
                        if (createdUser) {
                            const token = tokenMaker({ username });
                            res.json({ msg: 'User created successfully', token });
                        } else {
                            res.json({ msg: 'User not created' });
                        }
                    })
                    .catch((error) => {
                        console.error('Error creating user:', error);
                        res.status(500).json({ msg: 'Internal server error' });
                    });
            }
        })
        .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });
});

userRouter.post("/signin", (req, res) => {
    const { username, password } = req.body;

    UserCred.findOne({ username, password })
        .then((user) => {
            if (user) {
                res.json({ msg: "Logging successful", token: tokenMaker({ username }) });
            } else {
                res.json({ msg: "Wrong credentials" });
            }
        })
        .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).json({ msg: "Internal server error" });
        });
});


module.exports = { userRouter };
