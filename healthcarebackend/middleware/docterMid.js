const jwt = require('jsonwebtoken');
const { DocterCred } = require("../database/db");

const key = "AniketBhai007";

async function docterMid(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decodedToken = jwt.verify(token, key);
        if (!decodedToken) {
            return res.status(403).json({ msg: "Not authorized by middleware" });
        }

        const docter = await DocterCred.findOne({ username: decodedToken.username });
        if (!docter) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        req.userId = docter._id;
        next();
    } catch (error) {
        console.error('Error in doctor middleware:', error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = docterMid;
