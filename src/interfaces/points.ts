import {Types, Document} from "mongoose";

enum PointsType {
	Other,
	City,
	Region,
	Country,
	World
}

export default interface IGrade extends Document{
	_id: Types.ObjectId,
	number: number,
	student: Types.ObjectId,
	type: PointsType,
	createdAt?: boolean | string,
	updatedAt?: boolean | string
}