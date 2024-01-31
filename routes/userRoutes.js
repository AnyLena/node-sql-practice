import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser, getUserOrders, userValidation } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.get('/:id/orders', getUserOrders)
userRouter.post('/', userValidation, postUser)
userRouter.put('/:id', userValidation, putUser)
userRouter.delete('/:id', deleteUser)

export default userRouter