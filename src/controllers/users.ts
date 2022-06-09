import {Request, Response} from 'express'
import {Types} from 'mongoose'
import Users from './../models/Users'
import bcrypt from 'bcrypt'

const get = async (req: Request, res: Response) => {
	const user = await Users.findOne({_id: new Types.ObjectId(req.params.id)})

	res.json({
		code: 0,
		object: user
	})
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
	req.session.destroy()
	res.json({code: 0})
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

const update = async (req: Request, res: Response) => {
	const users = await Users.find().exec()

	res.json({
		code: 0,
		array: users
	})
}

export default {get, list, create, update, auth, logout, check}