const Habit = require('../models/habit');
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports.main = async(req,res)=>{
    var userId = req.user._id.toHexString();
    userId = new ObjectId(userId);
    var cutoff = new Date();
    cutoff.setDate(cutoff.getDate());
    const HabitScore = await Habit.find({user: userId, createdAt : {$lt: cutoff}, status : "Done"}).count();
    return res.render('home',{
        title : "Home",
        habitScore: HabitScore
    });
}

module.exports.home = (req,res)=>{
    return res.redirect('/home');
}