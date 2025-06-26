const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    Id : Number,
    title: { type: String, required: true},
    description: String,
        status: {type: String,
        enum: ['Pending','In Progress','Completed'],
        default : 'Pending'},
        DueDate: Date

    }, {timestamps: true});
module.exports = mongoose.model('Task', taskSchema);