
const { Router } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.listen(3000, () =>{
    console.log('App is listening on port 3000');
})
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/school', { useNewUrlParser: true });

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

//routes
//const bodyParser = require('body-parser');
app.use(express.json());
//app.use(bodyParser.json());

app.get('/students', async (req,res)=>{    //to view all students
    try{
        const sts = await students.find()
        res.json(sts);
    }
    catch (err){
        res.json({message: err.message});
    }
})

app.get('/student/:id', getStudent, (req,res) =>{   //to get one student using its id
    res.json(res.stu)
})

app.get('/teachers', async (req,res)=>{    //to view all teachers
    try{
        const sts = await teachers.find()
        res.json(sts);
    }
    catch (err){
        res.json({message: err.message});
    }
})

app.get('/teacher/:id', getTeacher, (req,res) =>{   //to get one teacher using its id
    res.json(res.tea)
})

app.post('/addTeacher',async (req,res) => {   //adding a teacher
    const tea = new teachers({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject
    });
    try{
        const newteacher = await tea.save()
        res.status(201).json(newteacher)

    }catch(err){
        res.status(400).json({message: err.message})
    }
});

app.post('/addStudent',async (req,res) => {   //adding a student
    const stu = new students({
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        section: req.body.section,
        assignTeacher: req.body.assignedTeacher 
    });
    try{
        const newstudent = await stu.save()
        res.status(201).json(newstudent)

    }catch(err){
        res.status(400).json({message: err.message})
    }
});

app.patch('/student/:id', getStudent, async (req, res) => {   //updating a student
    if (req.body.name != null) {
      res.stu.name = req.body.name
    }
    if (req.body.email != null) {
      res.stu.email = req.body.email
    }
    if (req.body.class != null) {
        res.stu.class = req.body.class
      }
    if (req.body.section != null) {
        res.stu.section = req.body.section
      }
      if (req.body.assignedTeacher != null) {
        res.stu.assignedTeacher = req.body.assignedTeacher
      }
    
    try {
      const updatedStudent = await res.stu.save()
      res.json(updatedStudent)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

  app.patch('/student/:id', getStudent, async (req, res) => {   //updating a teacher
    if (req.body.name != null) {
      res.tea.name = req.body.name
    }
    if (req.body.email != null) {
      res.tea.email = req.body.email
    }
    if (req.body.subject != null) {
        res.tea.subject = req.body.subject
      }
    
    try {
      const updatedTeacher = await res.tea.save()
      res.json(updatedTeacher)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  

  app.delete('/student/:id', getStudent, async (req, res) => {  //delete a student
    try {
      await res.stu.remove()
      res.json({ message: 'Deleted Student' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  app.delete('/teacher/:id', getTeacher, async (req, res) => {  //delete a teacher
    try {
      await res.tea.remove()
      res.json({ message: 'Deleted Teacher' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getStudent(req, res, next) {   //middleware for student
    let stu
    try {
      stu = await students.findById(req.params.id)
      if (stu == null) {
        return res.status(404).json({ message: 'Cannot find student' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.stu = stu
    next()
  }

    async function getTeacher(req, res, next) {  //middleware for teacher
    let tea
    try {
      tea = await students.findById(req.params.id)
      if (tea == null) {
        return res.status(404).json({ message: 'Cannot find teacher' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    res.tea = tea
    next()
  }