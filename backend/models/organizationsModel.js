import mongoose from "mongoose";


const organizationSchema = mongoose.Schema({
    organizationName: {
        type: String,
        required: true
    },
    faculties: [],
    students: [],
    departments: [],
    mockInterViews: [],
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    })


const Organization = mongoose.model('organization', organizationSchema)

export default Organization