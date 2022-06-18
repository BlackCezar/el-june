import {Request, Response} from 'express'
import {Types} from 'mongoose'
import IGrade from '../interfaces/grades';
import Grades from "../models/Grades";

const get = async (req: Request, res: Response) => {
	if (req.params.id) {
		const id = req.params.id || ''
		const object = await Grades.findOne({_id: new Types.ObjectId(id)}).populate('lesson').populate('student')
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}

const list = async (req: Request, res: Response) => {
	const array = await Grades.find({
		...req.query
	}).populate('lesson').populate('student').exec()

	res.json({
		code: 0,
		array
	})
}

const create = async (req: Request, res: Response) => {
	const payload = req.body as IGrade

	try {
		const object = await Grades.create(payload)

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
		const result = await Grades.findByIdAndRemove(req.params.id).exec()
	
		res.json({
			code: 0,
			object: result
		})
	} else res.status(400).send('Ошибка в запросе')
}

const update = async (req: Request, res: Response) => {
	if (req.params.id) {
		await Grades.updateOne({_id: new Types.ObjectId(req.params.id)}, {
			$set: {
				...req.body
			}
		}).exec()
	
		const object = await Grades.findOne({_id: new Types.ObjectId(req.params.id)})
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}

export default {get, list, create, remove, update}