const Task = require('../models/Task');
const Project = require('../models/Project');

// Helper to check and update overdue status
const checkOverdue = async (tasks) => {
  const currentDate = new Date();
  let updatedTasks = [];
  
  for (let task of tasks) {
    if (task.deadline && new Date(task.deadline) < currentDate && task.status !== 'Completed' && !task.isOverdue) {
      task.isOverdue = true;
      await task.save();
    } else if (task.isOverdue && (task.status === 'Completed' || (task.deadline && new Date(task.deadline) >= currentDate))) {
      task.isOverdue = false;
      await task.save();
    }
    updatedTasks.push(task);
  }
  return updatedTasks;
};

// @desc    Get tasks (filter by project, status, priority, search)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
  try {
    const { projectId, status, priority, search } = req.query;
    
    let query = {};
    
    // If not admin, only show tasks assigned to them or in their projects
    if (req.user.role !== 'Admin') {
      const userProjects = await Project.find({ members: req.user._id }).select('_id');
      const projectIds = userProjects.map(p => p._id);
      
      query = {
        $or: [
          { assignedTo: req.user._id },
          { projectId: { $in: projectIds } }
        ]
      };
    }

    if (projectId) query.projectId = projectId;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    let tasks = await Task.find(query).populate('assignedTo', 'name email').populate('projectId', 'name');
    
    tasks = await checkOverdue(tasks);
    
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email').populate('projectId', 'name');
    
    if (task) {
      res.json(task);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, projectId, status, priority, deadline } = req.body;

    const task = new Task({
      title,
      description,
      assignedTo,
      projectId,
      status,
      priority,
      deadline,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task (Admin can update all, Member can only update status)
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo, projectId, status, priority, deadline } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Member restriction
    if (req.user.role === 'Member') {
      if (task.assignedTo && task.assignedTo.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('Not authorized to update this task');
      }
      
      task.status = status || task.status;
    } else {
      // Admin update
      task.title = title || task.title;
      task.description = description || task.description;
      task.assignedTo = assignedTo || task.assignedTo;
      task.projectId = projectId || task.projectId;
      task.status = status || task.status;
      task.priority = priority || task.priority;
      task.deadline = deadline || task.deadline;
    }

    const updatedTask = await task.save();
    
    // Re-check overdue
    await checkOverdue([updatedTask]);
    
    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats
// @route   GET /api/tasks/stats/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
  try {
    let query = {};
    
    if (req.user.role !== 'Admin') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query);
    await checkOverdue(tasks);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;
    const overdueTasks = tasks.filter(t => t.isOverdue).length;
    
    const statusCounts = {
      'To Do': tasks.filter(t => t.status === 'To Do').length,
      'In Progress': tasks.filter(t => t.status === 'In Progress').length,
      'Completed': completedTasks
    };

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      statusCounts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats
};
