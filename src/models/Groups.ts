import mongoose, { Schema } from 'mongoose'
import IGroup from '../interfaces/groups'

const groupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    boss: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Users',
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model<IGroup>('Groups', groupSchema)