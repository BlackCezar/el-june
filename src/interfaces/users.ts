import {Types, Document} from "mongoose";

enum UserRole {
	Student = 'Student',
	Teacher = 'Teacher',
	Parent = 'Parent',
	Admin = 'Admin',
	Deputy = 'Deputy',
	ClassRoomTeacher = 'ClassRoomTeacher' }


export default interface IUser extends Document{
	_id: Types.ObjectId,
	fullname: string,
	login: string,
	password: string,
	role: UserRole,
	phone?: string,
	birthdate?: Date,
	parent?: Types.ObjectId,
	address?: string,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}