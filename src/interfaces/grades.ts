import {Types, Document} from "mongoose";

export default interface IGrade extends Document{
	_id: Types.ObjectId,
	number: number,
	student: Types.ObjectId,
	lesson: Types.ObjectId,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}