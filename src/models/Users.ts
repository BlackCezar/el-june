import mongoose, { Schema } from 'mongoose'
import IUser from '../interfaces/users'

const userSchema: Schema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Parent', 'Admin', 'Deputy', 'ClassRoomTeacher'],
        required: true
    },
    phone: String,
    birthdate: Date,
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: false
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'Groups'
    },
    address: String
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)