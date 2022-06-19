import {Types, Document} from "mongoose";

enum PointsType {
	Other,
	City,
	Region,
	Country,
	World
}

export default interface IPoint extends Document{
	_id: Types.ObjectId,
	number: number,
	student: Types.ObjectId,
	type: PointsType,
	group: Types.ObjectId,
	half: number,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}