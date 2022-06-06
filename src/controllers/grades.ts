import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Users from './../models/Users'

const get = async (req: Request, res: Response) => {
	const user = await Users.findOne({_id: new Types.ObjectId(req.params.id)})

	res.json({
		code: 0,
		object: user
	})
}

const list = async (req: Request, res: Response) => {
	const users = await Users.find().exec()

	res.json({
		code: 0,
		array: users
	})
}

const create = async (req: Request, res: Response) => {
	const users = await Users.find().exec()

	res.json({
		code: 0,
		array: users
	})
}

const remove = async (req: Request, res: Response) => {
	const users = await Users.find().exec()

	res.json({
		code: 0,
		array: users
	})
}

const update = async (req: Request, res: Response) => {
	const users = await Users.find().exec()

	res.json({
		code: 0,
		array: users
	})
}

export default {get, list, create, remove, update}