const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
idUser: {
    type : mongoose.SchemaTypes.ObjectId,
    ref : 'User' ,
},
code: {
    type : String,
},
date: {
    type : Date,
    default : Date.now
}
})

module.exports =mongoose.model('Setting',settingSchema);