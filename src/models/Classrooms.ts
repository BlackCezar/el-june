import mongoose, { Schema } from 'mongoose'
import IHelperModel from '../interfaces/helper'

const ClassRoomSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IHelperModel>('ClassRooms', ClassRoomSchema)