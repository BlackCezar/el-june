import { Schema, model, Types } from 'mongoose'

export enum Roles { 
    Student = 'Student', 
    Teacher = 'Teacher', 
    Parent = 'Parent', 
    Admin = 'Admin', 
    Deputy = 'Deputy', 
    ClassRoomTeacher = 'ClassRoomTeacher' }

interface IUser {
    fullname: string,
    login: string,
    password: string,
    role: Roles,
    phone?: string,
    birthdate?: Date,
    parent?: Types.ObjectId,
    address?: string
}

const userSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true
    },
    login: {
        type: String,
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
        ref: 'User'
    },
    address: String
})

export const User = model<IUser>('User', userSchema)