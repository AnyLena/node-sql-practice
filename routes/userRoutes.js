import express from 'express';
import { getUsers, getUser, postUser } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', postUser)


export default userRouter