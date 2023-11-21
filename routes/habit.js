const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habits');

router.get('/add-habit', habitController.showAddHabitForm);
router.get('/progress', habitController.progress);
router.get('/select-options', habitController.habitOptions);
router.post('/create-habit', habitController.addHabit);
router.get('/edit-habit/:habit_id', habitController.habitEditForm);
router.post('/update-habit/', habitController.editHabit);
router.post('/update-status/', habitController.updateStaus);
router.get('/:id', habitController.all);
router.get('/filter/:date', habitController.filterByDate);

module.exports = router;

