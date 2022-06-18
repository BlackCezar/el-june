import mongoose, { Schema } from 'mongoose'
import ILesson from '../interfaces/lessons'

const lessonSchema: Schema = new Schema({
    date: {
        type: String,
        required: true
    },
    subject: String,
    topic: String,
    homework: String,
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
        required: true
    },
    classroom: String,
    order: Number
}, {
    timestamps: true
})

export default mongoose.model<ILesson>('Lessons', lessonSchema)