import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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
});

async function start() {
  try {
    const configDB = {
      url: process.env.MONGO_USER ? `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}` : `mongodb://${process.env.MONGO_URL}`,
      options: {
      }
    }
    await mongoose.connect(configDB.url, configDB.options)
    console.log('Mongoose connected')
  } catch (err) {
    console.log(err)
  }

}