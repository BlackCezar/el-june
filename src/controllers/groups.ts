import {Request, Response} from 'express'
import {Types} from 'mongoose'
import * as mongoose from 'mongoose';
import IGroup from '../interfaces/groups';
import Groups from "../models/Groups";

const get = async (req: Request, res: Response) => {
	if (req.params.id) {
		const id = req.params.id
		const object = await Groups.findOne({_id: new Types.ObjectId(id)}).populate('boss').populate('students')
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}

const list = async (req: Request, res: Response) => {
	if (req.query.students) {
		const array = await Groups.find({
			students: new Types.ObjectId(String(req.query.students))
		}).populate('boss').populate('students').exec()
	
		res.json({
			code: 0,
			array
		})
	} else {
			const array = await Groups.find({
				// ...req.query
			}).populate('boss').populate('students').exec()
		
			res.json({
				code: 0,
				array
			})

	}
}

const create = async (req: Request, res: Response) => {
	const payload = req.body as IGroup
	try {
		const {_id} = await Groups.create(payload)

		const object = await Groups.findOne({_id}).populate('boss').populate('students')

		res.json({
			code: 0,
			object: object
		})
	} catch (err) {
		res.status(400).send("Имя должно быть уникальным")
	}
}

const remove = async (req: Request, res: Response) => {
	if (req.params.id) {
		const result = await Groups.findByIdAndRemove(req.params.id).exec()
	
		res.json({
			code: 0,
			object: result
		})
	} else res.status(400).send('Ошибка в запросе')
}

const update = async (req: Request, res: Response) => {
	if (req.params.id) {
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
	} else res.status(400).send('Ошибка в запросе')
}

export default {get, list, create, remove, update}