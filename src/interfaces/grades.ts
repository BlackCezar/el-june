import {Types, Document} from "mongoose";

export default interface IGrade extends Document{
	_id: Types.ObjectId,
	number: number,
	student: Types.ObjectId,
	date: string,
	lesson: Types.ObjectId,
	subject?: string,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}