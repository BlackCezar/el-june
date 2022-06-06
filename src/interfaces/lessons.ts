import {Types, Document} from "mongoose";

export default interface ILesson extends Document{
	_id: Types.ObjectId,
	date: Date,
	subject: Types.ObjectId,
	topic?: string,
	homework?: string,
	teacher: Types.ObjectId,
	group: Types.ObjectId,
	classroom: Types.ObjectId,
	order: number,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}