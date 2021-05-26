const router = require('express').Router();
let Student = require('../models/student.model');

//home
router.route('/').get((req, res) => {
    Student.find() 
        .then(student => res.json(student))
        .catch(err => res.status(400).json('error: '+ err));
});

//add
router.route('/add').post((req, res) => {

    const fullname = req.body.fullname;
    const email = req.body.email;
    const newStudent = new Student({fullname, email});

    console.log(req.body);

    newStudent.save()
        .then(student => res.json('New Record added!'))
        .catch(err => res.status(400).json('Error: '+err));

});


//delete
router.route('/:id').delete((req,res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => res.json('Record was deletd.'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/edit/:id').get((req, res) => {
    Student.findById(req.params.id) 
        .then(student => res.json(student))
        .catch(err => res.status(400).json('error: '+ err));
});



//update
router.route('/update/:id').post((req,res) => {
    console.log(req.body);
    Student.findByIdAndUpdate(req.params.id)
        .then(student => {
            student.fullname = req.body.fullname;       
            student.email = req.body.email;
            
            student.save()
                .then(student => res.json('Record was updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});



module.exports = router;   