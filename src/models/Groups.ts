import mongoose, { Schema } from 'mongoose'
import IGroup from '../interfaces/groups'

const groupSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    boss: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Users',
        required: false
    },
}, {
    timestamps: true
})

export default mongoose.model<IGroup>('Groups', groupSchema)