const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    class: {
        type: Number,
        min: 8,
        max: 9
    },
    section: {
        type: String,
        uppercase: true,
        enum: ['A', 'B', 'C']
    },
    assignedTeacher : String
})

const student = mongoose.model('student', studentSchema);

module.exports = student;