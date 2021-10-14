const mongoose = require("mongoose");

const groupeSchema = new mongoose.Schema({
nom: {
    type : String,


},
image: {
    type : String,


},
desc: {
    type : String,


},
type: {
    type : String,


},
cat: {
    type : String,

},
userid: {
    type : String,

},
user : [
    {
    id : String
}
]


})

module.exports =mongoose.model('Groupe',groupeSchema);