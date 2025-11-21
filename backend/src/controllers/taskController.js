const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.create({ user: req.user._id, title, description, status });
    res.status(201).json({ task });
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) { next(err); }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if(!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ task });
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if(!task) return res.status(404).json({ error: 'Task not found' });
    const { title, description, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    await task.save();
    res.json({ task });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if(!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
