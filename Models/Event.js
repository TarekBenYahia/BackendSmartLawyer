const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
userid: {
    type : String
},
title: {
    type : String,
 
    min : 6,
    max: 1024
},
start: {
    type : Date,
   
},
end: {
    type : Date,

},
color: {
    primary: {
        type : String,
        default : '#1e90ff',
        max: 1024
    },
    secondary: {
        type : String,
        default : '#D1E8FF',
        max: 1024
    },
},

draggable: {
type : Boolean,
default : true
},


resizable: {
    beforeStart: {
        type : Boolean,
        default : true
    },
    afterEnd: {
        type : Boolean,
        default : true
    },
    
},

allDay: {
    type : Boolean,
    default : false
},

meta: {
    note: {
        type : String,
        max: 1024
    },
    location: {
        type : String,
        max: 1024
    },
    
}
})

module.exports =mongoose.model('Event',eventSchema);