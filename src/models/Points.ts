import mongoose, { Schema } from 'mongoose'
import IPoint from '../interfaces/points'

const pointSchema: Schema = new Schema({
    number: {
        type: Number,
        required: true
    },
    half: {
        type: Number
    },
    type: {
        type: String,
        enum: ['Other', 'City', 'Region', 'Country', 'World'],
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Groups',
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model<IPoint>('Points', pointSchema)