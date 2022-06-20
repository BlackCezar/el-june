import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Users from './../models/Users'
import bcrypt from 'bcrypt'

const get = async (req: Request, res: Response) => {
	if (req.params.id) {
		const user = await Users.findOne({_id: new Types.ObjectId(req.params.id)})
	
		res.json({
			code: 0,
			object: user
		})
	} else res.status(400).send('Ошибка в запросе')
}

const check = async (req: Request, res: Response) => {
	if (req.session.isAuth) {
		res.json({
			code: 0,
			object: req.session.user
		})
	} else res.sendStatus(403)
}

const auth = async (req: Request, res: Response) => {
	const {login, password} = req.body

	const user = await Users.findOne({login})

	if (user) {
		if (await bcrypt.compare(password, user.password)) {
			req.session.isAuth = true 
			req.session.user = user 

			res.json({
				code: 0,
				object: user
			})
		} else res.json({
				code: 400,
				message: 'Неправильный пароль'
			})
	} else res.json({
			code: 404,
			message: 'Пользователь не найден'
		})
}

const logout = async (req: Request, res: Response) => {
	//@ts-ignore
	delete req.session.isAuth
	//@ts-ignore
	delete req.session.user
	//@ts-ignore
	req.session.destroy()
	res.json({code: 0})
}

const list = async (req: Request, res: Response) => {
	const params = req.query

	if (params.fullname) params.fullname = {$regex: params.fullname}
	const users = await Users.find(params).populate('parent').populate('group').exec()

	res.json({
		code: 0,
		array: users
	})
}

const create = async (req: Request, res: Response) => {
	let data = {
		login: req.body.login,
		role: req.body.role,
		fullname: req.body.fullname,
		password: await bcrypt.hash(req.body.password, 10),
		parent: null,
		group: null
	}
	if (req.body.parent) data.parent = req.body.parent
	if (req.body.group) data.group = req.body.group
	
	try {
		const object = await Users.create(data)

		res.json({
			code: 0,
			object
		})
	} catch (err) {
		console.log(err)	
		res.status(400).send("Имя должно быть уникальным")
	}
}


const remove = async (req: Request, res: Response) => {
	if (req.params.id) {
		const result = await Users.findByIdAndRemove(req.params.id).exec()
	
		res.json({
			code: 0,
			object: result
		})
	} else res.status(400).send('Ошибка в запросе')
}

const update = async (req: Request, res: Response) => {
	if (req.params.id) {
		await Users.updateOne({_id: new Types.ObjectId(req.params.id)}, {
			$set: {
				...req.body
			}
		}).exec()
		
		const object = await Users.findOne({_id: new Types.ObjectId(req.params.id)})
	
		res.json({
			code: 0,
			object
		})
	} else res.status(400).send('Ошибка в запросе')
}


export default {get, list, create, update, auth, logout, check, remove}