import mongoose from "mongoose";

const facultySchema = mongoose.Schema({
    organization: {
        type: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String
    },
    students: []
})


const Faculties = mongoose.model('faculties', facultySchema)


export default Faculties