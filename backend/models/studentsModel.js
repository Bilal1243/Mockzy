import mongoose from "mongoose";

const studentsSchema = mongoose.Schema({
    organization: {
        type: mongoose.Types.ObjectId,
    },
    faculty: {
        type: mongoose.Types.ObjectId
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
    currentModule: {
        type: String
    }
})


const Students = mongoose.model('students', studentsSchema)


export default Students