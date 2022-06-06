import mongoose, { Schema } from 'mongoose'
import ILesson from '../interfaces/lessons'

const lessonSchema: Schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'Subjects',
        required: true
    },
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
    classroom: {
        type: Schema.Types.ObjectId,
        ref: 'ClassRooms'
    },
    order: Number
}, {
    timestamps: true
})

export default mongoose.model<ILesson>('Lessons', lessonSchema)