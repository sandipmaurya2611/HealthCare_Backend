const jwt = require('jsonwebtoken');
const {UserCred} = require("../database/db");
const key =  "AniketBhaiLikesBhabhi";

function userMid(req, res, next) {
    const token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(401).json({ msg: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, key);
        if (!decodedToken) {
            return res.status(401).json({ msg: 'Invalid or expired token' });
        }
        UserCred.findOne({username:decodedToken.username})
            .then((user)=>{
                req.userId = user._id;
                next();
            })
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

module.exports = userMid;
