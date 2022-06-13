import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from "mongoose";
import IUser from './interfaces/users';
import bcrypt from 'bcrypt'
import Users from './models/Users'
import Classrooms from './models/Classrooms'
import Points from './models/Points'
import Subjects from './models/Subjects'
import Lessones from './models/Lessones'
import Groups from './models/Groups'
import Grades from './models/Grades'
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

declare module 'express-session' {
  interface SessionData {
    user: IUser;
    isAuth: boolean;
  }
}

import session from 'express-session'
import usersRouter from './routes/users'
import groupsRouter from './routes/groups'
import lessonsRouter from './routes/lessons'
import gradesRouter from './routes/grades'
import pointsRouter from './routes/points'
import subjectsRouter from './routes/subjects'
import classroomsRouter from './routes/classrooms'

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'key',
    saveUninitialized: true
  }))

app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)
app.use('/api/lessons', lessonsRouter)
app.use('/api/grades', gradesRouter)
app.use('/api/points', pointsRouter)
app.use('/api/subjects', subjectsRouter)
app.use('/api/classrooms', classroomsRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  start()
})



async function start() {
  try {


    const configDB = {
      url: process.env.MONGO_USER ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}` : `mongodb://${process.env.MONGO_URL}`,
      options: {
      }
    }
    await mongoose.connect(configDB.url, configDB.options)

    const admin = await Users.findOne({login: process.env.ADMIN_LOGIN})
    if (!admin) {
      await Users.create({
        login: process.env.ADMIN_LOGIN || 'admin',
        password: await bcrypt.hash(process.env.ADMIN_PASS || 'admin', 10),
        role: 'Admin',
        fullname: 'Administrator'
      })
    }
    console.log('Mongoose connected')
  } catch (err) {
    console.log(err)
  }
}