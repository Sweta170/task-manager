const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');

router.route('/stats/dashboard').get(protect, getDashboardStats);

router.route('/')
  .get(protect, getTasks)
  .post(protect, admin, createTask);

router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask) // Members can update status, Admin can update all
  .delete(protect, admin, deleteTask);

module.exports = router;
