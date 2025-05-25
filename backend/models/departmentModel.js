import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Departments = mongoose.model("departments", departmentSchema);

export default Departments;
