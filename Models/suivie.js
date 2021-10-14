const mongoose = require("mongoose");

const suivieSchema = new mongoose.Schema({
userid : {
    type : String
}, 
avocatid: {
    type : String
},
rdvid: {
    type : String,
},
prdv: {
    type : Boolean,
    
},
rrdv: {
    type : Boolean,
    
},
paiment: {
    type : Boolean,
    
},
verification: {
    type : Boolean,
},
})

module.exports =mongoose.model('Suivie',suivieSchema);