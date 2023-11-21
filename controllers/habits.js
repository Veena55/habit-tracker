const Habit = require('../models/habit');

module.exports.all = async(req,res) => { 
    var date = new Date();
    date.setDate(date.getDate());
    const habits = await Habit.find({user : req.params.id, createdAt : {$lte: date} }).sort({createdAt:-1}).populate('user').exec();
    return res.render('habits',{
        title : "My Habits",        
        habitList : habits
    });
}

module.exports.filterByDate = async(req,res) => {
    console.log(req.params.date);
    var filteredDate = req.params.date.split('-');
    let date = new Date(filteredDate);
    const habits = await Habit.find({user : req.user._id , createdAt : {$gte: date} });
    console.log(habits);
    if(habits) {
        return res.render('habits',{
            title : 'Filter By Date',
            habitList : habits
        });
    }
}

module.exports.habitEditForm = async(req,res) => {      
    console.log(req.params.habit_id);  
    const habit = await Habit.findById(req.params.habit_id);
    return res.render('habitForm',{
        title : "Edit Habit",        
        habit : habit
    });
}
module.exports.showAddHabitForm = (req,res) =>{
    try {
        console.log("hi");
        return res.render('habitform', {
            title : "Add Habit"
        });
        
    } catch (error) {
        console.log(error);
       
    }
}

module.exports.habitOptions = (req,res) => {
    return res.render('habitoptions', {
        title : "Select Options"
    })
}



module.exports.addHabit = async(req,res) => {
    console.log(req.body.color);
    try {
        const habit = await Habit.create({
            title :  req.body.title,
            duration : req.body.duration,
            description : req.body.description,
            color : req.body.color,
            user : req.body.user
        })
        if(habit) {
            console.log(habit);
            return res.redirect('/home');
        } else {
            console.log("Getting error while adding habit");
        }
    } catch (error) {
        console.log("Something Went Wrong!"+error);
        return;
    }
}

module.exports.editHabit = async(req,res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.body.habit_id,{
            title :  req.body.title,
            duration : req.body.duration,
            description : req.body.description,
            color : req.body.color
        })
        if(habit) {
            console.log(habit);
            return res.redirect(`/habits/${req.user._id}`);
        } else {
            console.log("Getting error while adding habit");
        }
    } catch (error) {
        console.log("Something Went Wrong! " +error);
        return;
    }
}
module.exports.updateStaus = async(req,res) => {
    try {
        const updateHabitStatus = await Habit.findByIdAndUpdate(req.body.id,{
            status :  req.body.status
        })
        if(updateHabitStatus) {
            console.log(updateHabitStatus);
            return res.status(200).json({redirectUrl: `/habits/${req.user._id}`});
        } else {
            console.log("Getting error while adding habit");
        }
    } catch (error) {
        console.log("Something Went Wrong! " +error);
        return;
    }
}