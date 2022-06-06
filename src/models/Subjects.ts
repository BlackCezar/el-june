import mongoose, { Schema } from 'mongoose'
import IHelperModel from '../interfaces/helper'

const subjectSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IHelperModel>('Subjects', subjectSchema)