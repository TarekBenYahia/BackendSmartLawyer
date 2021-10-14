const mongoose = require("mongoose");

const RendezvousSchema = new mongoose.Schema({
userid : {
    type : String
}, 
avocatid: {
    type : String
},
sujet: {
    type : String,
},
date: {
    type : String,
    
},
etat: {
    type : String,
    
},


})

module.exports =mongoose.model('Rendezvous',RendezvousSchema);