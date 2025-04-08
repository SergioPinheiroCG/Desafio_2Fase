let mongoose = require('mongoose');

let taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pendente', 'Em andamento', 'Concluída'],
        default: 'Pendente'
    },
});

module.exports = mongoose.model('Task', taskSchema);