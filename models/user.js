const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String
    }
},
{
    timestamps : true 
}
);

module.exports = mongoose.model('Users',userSchema);

