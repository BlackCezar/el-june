import {Request, Response} from 'express'
import {Types} from 'mongoose'
import IGrade from '../interfaces/grades';
import IUser from '../interfaces/users';
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

interface IUserSSO extends IUser {
	grades: [IGrade]
} 

const sso = async (req: Request, res : Response ) => {
	let {students, half} = req.body
	const array = []

	for (const student of students) {
		let grades = await Grades.find({student: new Types.ObjectId(student._id), date: '1'}).populate('lesson').exec() as IGrade[]
		let gradesSecond = await Grades.find({student: new Types.ObjectId(student._id), date: '2'}).populate('lesson').exec() as IGrade[]

		if (half === 2) {
			const sso = gradesSecond.reduce((a, b) => a + b.number, 0) / gradesSecond.length * 2
			array.push({
				...student,
				grades: gradesSecond,
				sso
			})
		} else if (half === 1) {

			const sso = grades.reduce((a, b) => a + b.number, 0) / grades.length * 2
			array.push({
				...student,
				grades,
				sso
			})
		}
	}


	res.json(array)
}

const create = async (req: Request, res: Response) => {
	const payload = req.body as IGrade

	//@ts-ignore
	if (payload.hasOwnProperty('lesson') && payload.lesson === '') delete payload.lesson
	try {
		if (['1', '2', '3'].includes(req.body.date)) {
			const r = await Grades.deleteMany({
				date: req.body.date,
				student: req.body.student,
				subject: req.body.subject,
			})
			console.log(r)
		}
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

export default {get, list, create, remove, update, sso}