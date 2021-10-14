const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
nom: {
    type : String,


},
image: {
    type : String,


},
desc: {
    type : String,
},

quantite: {
    type : String,

},
prix: {
    type : String
}


})

module.exports =mongoose.model('Produit',produitSchema);