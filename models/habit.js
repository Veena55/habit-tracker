const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    duration : {
        type : String
    },
    description : {
        type: String
    },
    color: {
        type : String
    },
    status : {
        type : String
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('Habit', habitSchema);