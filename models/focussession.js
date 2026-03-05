const mongoose = require('mongoose');

const focusSessionSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    startTime: Date,
    endTime: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
});
module.exports = mongoose.model('FocusSession', focusSessionSchema);