import mongoose, { Schema } from 'mongoose'
import IGrade from '../interfaces/grades'

const gradesSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    date: String,
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lessons'
    }
}, {
    timestamps: true
})

export default mongoose.model<IGrade>('Grades', gradesSchema)