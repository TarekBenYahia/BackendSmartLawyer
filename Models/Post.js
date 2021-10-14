const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
userid : {
    type : String
}, 
imageuser: {
    type : String,
},
nom: {
    type : String,
},
prenom: {
    type : String,
},
image: {
    type : String,
},
datepost: {
    type : Date,
    default : Date.now
},
message: {
    type : String
},
comments : [
    {
    nom : String,
    prenom : String,
    imagecomment : String,
    message : String,
    userid : String,
    rating : Number,
    time :  { type: Date, default: Date.now }
}
],
likes: [
    {
    idUser : String,
}
],
role: {
    type : String
}

})

module.exports =mongoose.model('Blogs',PostSchema);