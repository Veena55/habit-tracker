const mongoose =  require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/habits');

const db = mongoose.connection;

db.on('error',(err)=>{console.log("Something went wrong!")});
db.once('open', ()=>{console.log("Connected to database!");});

module.exports = db;