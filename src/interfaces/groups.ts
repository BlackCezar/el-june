import {Types, Document} from "mongoose";

export default interface IGroup extends Document{
	_id: Types.ObjectId,
	name: string,
	students: [Types.ObjectId],
	boss: Types.ObjectId,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}