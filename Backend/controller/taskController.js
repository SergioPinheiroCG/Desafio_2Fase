const Task = require('../model/task.js');

const createTask = async (req, res) => {
    try {
        const { title, status } = req.body;

        const newTask = new Task({
            title,
            status,
        });

        await newTask.save();

        res.json({
            message: 'Tarefa criada com sucesso!',
            task: newTask,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar tarefa' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar tarefas' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.deleteOne({ _id: id });
        res.json({ message: 'Tarefa removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover tarefa' });
    }
};

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, status } = req.body;

        const task = await Task.findByIdAndUpdate(id, { title, status }, { new: true });

        res.json({
            message: 'Tarefa atualizada com sucesso!',
            task,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar tarefa' });
    }
};

module.exports = { getAllTasks, createTask, editTask, deleteTask };