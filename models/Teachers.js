const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    subject: String
})

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;