import {Document, Types} from "mongoose";

export default interface IHelperModel extends Document{
	_id: Types.ObjectId,
	name: string,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}