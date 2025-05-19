import mongoose from "mongoose";
import bcrypt from 'bcrypt'


const userSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'faculty', 'organization', 'admin']
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    status: { type: String, default: "offline" }, 
    lastSeen: { type: Date },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}




const Users = mongoose.model('users', userSchema)


export default Users