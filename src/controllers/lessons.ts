import {Request, Response} from 'express'
import {Types} from 'mongoose'
import ILesson from '../interfaces/lessons';
import Lessons from "../models/Lessones";

const get = async (req: Request, res: Response) => {
	if (req.params.id) {
		const id = req.params.id || ''
		const object = await Lessons.findOne({_id: new Types.ObjectId(id)}).populate('teacher').populate('group')
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}

const list = async (req: Request, res: Response) => {
	const array = await Lessons.find({
		...req.query
	}).populate('teacher').populate('group').exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	const payload = req.body as ILesson
	console.log(payload)
	try {
		const object = await Lessons.create(payload)

		res.json({
			code: 0,
			object: object
		})
	} catch (err) {
		console.log(err)
		res.status(400).send("Имя должно быть уникальным")
	}
}

const remove = async (req: Request, res: Response) => {
	if (req.params.id) {
		const result = await Lessons.findByIdAndRemove(req.params.id).exec()
	
		res.json({
			code: 0,
			object: result
		})
	} else res.status(400).send('Ошибка в запросе')
}

const update = async (req: Request, res: Response) => {
	if (req.params.id) {
		await Lessons.updateOne({_id: new Types.ObjectId(req.params.id)}, {
			$set: {
				...req.body
			}
		}).exec()
	
		const object = await Lessons.findOne({_id: new Types.ObjectId(req.params.id)})
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}

export default {get, list, create, remove, update}