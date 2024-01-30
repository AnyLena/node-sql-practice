import express from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser, getUserOrders } from '../controllers/userController.js';
const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.get('/:id/orders', getUserOrders)
userRouter.post('/', postUser)
userRouter.put('/:id', putUser)
userRouter.delete('/:id', deleteUser)


export default userRouter