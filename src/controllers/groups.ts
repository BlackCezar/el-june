import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Users from './../models/Users'
import Groups from "../models/Groups";

const get = async (req: Request, res: Response) => {
	const object = await Groups.findOne({_id: new Types.ObjectId(req.params.id)})

	res.json({
		code: 0,
		object
	})
}

const list = async (req: Request, res: Response) => {
	const array = await Groups.find({
		...req.params
	}).exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	const {name} = req.body

	try {
		const object = await Groups.create({
			name
		})

		res.json({
			code: 0,
			object: object
		})
	} catch (err) {
		res.status(400).send("Имя должно быть уникальным")
	}
}

const remove = async (req: Request, res: Response) => {
	const result = await Groups.findByIdAndRemove(req.params.id).exec()

	res.json({
		code: 0,
		object: result
	})
}

const update = async (req: Request, res: Response) => {
	await Groups.updateOne({_id: new Types.ObjectId(req.params.id)}, {
		$set: {
			...req.body
		}
	}).exec()

	const object = await Groups.findOne({_id: new Types.ObjectId(req.params.id)})

	res.json({
		code: 0,
		object
	})
}

export default {get, list, create, remove, update}