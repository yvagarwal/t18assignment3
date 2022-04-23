
const express = require('express');
const app = express();
const port = 3000;

app.listen(3000, () =>{
    console.log('App is listening on port 3000');
})
const mongoose = require('mongoose');
const student = require('./models/Students');
const { getMaxListeners } = require('./models/Students');
mongoose.connect('mongodb://localhost:27017/school');

const students = require('./models/Students');
const teachers = require('./models/Teachers');


//(Using dummy data randomly created)

const studentData = [
    {
        name: 'Ravi',
        email: 'ravi@gmail.com',
        class: 8,
        section: 'A'

    },
    {
        name: 'Shreya',
        email: 'shreya@gmail.com',
        class: 9,
        section: 'B'

    },
    {
        name: 'Noni',
        email: 'noni@gmail.com',
        class: 8,
        section: 'C'

    },
    {
        name: 'yash',
        email: 'yash@gmail.com',
        class: 8,
        section: 'C'

    },
    {
        name: 'Tina',
        email: 'Tina@gmail.com',
        class: 9,
        section: 'A'

    },
    {
        name: 'Rani',
        email: 'rani@gmail.com',
        class: 8,
        section: 'B'
    },
    {
        name: 'Rajan',
        email: 'Rajan@gmail.com',
        class: 9,
        section: 'C'

    },
    {
        name: 'Paul',
        email: 'paul@gmail.com',
        class: 8,
        section: 'A'
    },
    {
        name: 'Priya',
        email: 'priya@gmail.com',
        class: 9,
        section: 'B'

    },
    {
        name: 'Raul',
        email: 'raul@gmail.com',
        class: 9,
        section: 'A'
    }
]

const teacherData = [
    {
        name: 'Swain',
        email: 'Swain@gmail.com',
        subject: 'Physics'
    },
    {
        name: 'Hari',
        email: 'hari@gmail.com',
        subject: 'Chemistry'
    },
    {
        name: 'Guha',
        email: 'guha@gmail.com',
        subject: 'Maths'
    },
    {
        name: 'Rima',
        email: 'rima@gmail.com',
        subject: 'History'
    },
    {
        name: 'Niru',
        email: 'niru@gmail.com',
        subject: 'English'
    }
]

//problem1:
const createTeacher = (obj) =>{  //I assumed obj is a single object instead of array of objects
    const p = new teachers(obj);
    p.save();
}
for (const x of teacherData){
    createTeacher(x);
}
//another way to add: teacher.insertMany(teacherData);


//problem2:
const createStudent = (obj) =>{
    const p = new students(obj);
    p.save();
}
students.insertMany(studentData);

//problem3:
//const makeRandomNum = () =>{ Math.floor(Math.random*5) }; //function to give random number between 0 and 4 (both inclusive)

async function assignTeacherToStudent (studentId, teacherId) {
    await students.findByIdAndUpdate({assignTeacher: teacherId});
}


//problem 4:
async function getTeachers(sub) {
    await teachers.find({subject: sub}).exec().then(data=>{
        console.log(data);
    });
}
//getTeachers('Physics')

//problem 5:

async function getStudents(cls, sec){
    await students.find({class : parseInt(cls), section : sec}).exec().then(data => {
        console.log(data);
    });
}
//getStudents(8,'C');

//problem 6:

async function editStudent(sId){
    await students. updateOne({_id: sId}, /* set  updateconditions here */ {class: 9} ).exec().then(res => {
        console.log(res);
    })
}

//problem 7:
async function getAssignedStudentsToTeacher(teacherId){
    await students.find({assignTeacher: teacherId}).exec.then(data =>{
        console.log(data);
    })
}
