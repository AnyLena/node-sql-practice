import express from 'express';
import { getUsers, getUser, postUser, putUser } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.post('/', postUser)
userRouter.put('/:id', putUser)


export default userRouter