const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    fullname:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        trim: true
    },

},{
    timestamps: true
});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;