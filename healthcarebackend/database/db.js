const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rishikale32:Rushi%409423@cluster0.ww1sds3.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const UserCredSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})



const UserDocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCred'
    },
    images:[{
        filename:String,
        contentType:String,
        imageBase64:String
    }]
})


const UserCred = mongoose.model('UserCred', UserCredSchema);
const UserDocument  = mongoose.model('UserDocument', UserDocumentSchema);

module.exports = {UserCred, UserDocument}