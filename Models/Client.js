const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
userid : {
    type : String
}   , 
image: {
    type : String,
},
nom: {
    type : String,
    max :255
},
prenom: {
    type : String,
    max: 1024
},
daten: {
    type : Date,
},
country: {
    type : String,
    max: 1024
},
city: {
    type : String,
    max: 1024
},
description: {
    type : String,
    max: 1024
},
sexe: {
    type : String,  
},
phone: {
    type : String,  
}

})

module.exports =mongoose.model('Client',ClientSchema);