const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://rishikale32:Rushi%409423@cluster0.ww1sds3.mongodb.net/', )
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
        filename: String,
        contentType: String,
        imageBase64: String
    }],
    age:String,
    blood:String,
    height:String,
    physicalActivity:String,
    weight:String,
    allergies:[String]

})
const DocterCredSchema = new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})

const DocterDocumentSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DocterCred'
    },
    gender:String,
    contactInfo:[String],
    govId:String,
    mediDeg:[String],
    medSchool:String,
    professionalExp:String

})

const DocterRatingSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'DocterCred'
    },
ratingSum:Number,
    totalRating: Number,
    ratedUsers:[String]
})
const UserCred = mongoose.model('UserCred', UserCredSchema);
const UserDocument  = mongoose.model('UserDocument', UserDocumentSchema);
const DocterCred  = mongoose.model('DocterCred', DocterCredSchema);
const DocterDocument  = mongoose.model('DocterDocument', DocterDocumentSchema);
const DocterRating = mongoose.model('DocterRating',DocterRatingSchema )

module.exports = {UserCred, UserDocument, DocterCred, DocterDocument,DocterRating}