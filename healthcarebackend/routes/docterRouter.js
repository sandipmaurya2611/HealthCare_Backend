const express = require('express')
const {UserCred, DocterCred, DocterDocument} = require("../database/db");
const jwt = require("jsonwebtoken");
const docterMid = require("../middleware/docterMid");
const docterRouter = express()
key = "AniketBhai007"
function tokenMaker(data) {
    const token = jwt.sign({ username: data.username }, key);
    return token;
}
docterRouter.post("/signup", async (req, res) => {
    const { username, firstname, lastname, password } = req.body;

    try {
        const existingUser = await DocterCred.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "Docter already exists" });
        }

        const createdUser = await DocterCred.create({ username, firstname, lastname, password });

        const token = tokenMaker({ username });
        res.json({ msg: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});

docterRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await DocterCred.findOne({username,password});
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

docterRouter.post('/addinfo',docterMid,async (req,res)=>{
    const {gender,
        contactInfo,
        govId,
        mediDeg,
        medSchool,
        professionalExp} = req.body

    try {
        const docterDocument = await DocterDocument.create({
            userId: req.userId,
            gender,
            contactInfo,
            govId,
            mediDeg,
            medSchool,
            professionalExp
        });
        res.json({ msg: "successful" });
    } catch (error) {
        console.error('Error creating doctor document:', error);
        res.status(500).json({ msg: "Internal server error" });
    }

})




module.exports = {docterRouter}