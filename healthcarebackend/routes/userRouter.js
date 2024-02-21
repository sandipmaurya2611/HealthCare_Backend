const express = require('express');
const { UserCred, UserDocument} = require("../database/db");
const userRouter = express();
const jwt = require('jsonwebtoken');
const userMid = require("../middleware/userMid");
const {upload} = require("../middleware/multer");
const {readFileSync} = require("fs");
const {join} = require("path");
const key = "AniketBhaiLikesBhabhi";


function tokenMaker(data) {
    const token = jwt.sign({ username: data.username }, key);
    return token;
}

userRouter.post("/signup", async (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    try {
        const existingUser = await UserCred.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const createdUser = await UserCred.create({ username, firstname, lastname, password });

        const token = tokenMaker({ username });
        res.json({ msg: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserCred.findOne({ username,password });
        if (!user) {
            return res.status(401).json({ msg: "Wrong credentials" });
        }

        const token = tokenMaker({ username });
        res.json({ msg: "Logging successful", token });
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

userRouter.post("/addinfo",userMid,(req,res)=>{
    const userId = req.userId;
    const {height, weight, blood, age, physicalActivity,allergies}= req.body;
    UserDocument.create({userId, images:[],height, weight, blood, age, physicalActivity,allergies})
        .then((userDocumnet)=>{
            res.json({msg:"succesful"})
        })
        .catch(()=>{
            res.status(500).json({msg:'internal error'})
        })
})
userRouter.post("/addreport", userMid, upload.single('file'),(req, res) => {

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }

    const { filename, mimetype, buffer } = req.file;

    // Convert buffer to base64 string
    const imageBase64 = buffer.toString('base64');

const userId =req.userId
        UserDocument.findOneAndUpdate(
        { userId },
        { $push: { images: { filename, contentType: mimetype, imageBase64 } } },

        { upsert: true, new: true } // upsert: true creates a new document if it doesn't exist, new: true returns the updated document
    )
        .then((userDocument) => {
            res.json({ msg: "User information and image added successfully", userDocument });
        })
        .catch((error) => {
            console.error('Error adding user info and image:', error);
            res.status(500).json({ msg: 'Internal server error' });
        });


});

module.exports = { userRouter };
