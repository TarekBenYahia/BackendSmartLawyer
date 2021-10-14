const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema({

userid: {
    type : String,

},
userName: {
    type : String
},
Produits : [
    {
    id : String,
    nomP: String,
    quantite: String,
    total : String,
    image: String

}
]


})

module.exports =mongoose.model('Panier',panierSchema);