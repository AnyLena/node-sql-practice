import express from 'express';
import { getUsers, getUser, postUser, putUser, putInactive, deleteUser, getUserOrders, userValidation, userValidationUpdate, checkUser } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', checkUser, getUser)
userRouter.get('/:id/orders', checkUser, getUserOrders)
userRouter.post('/', userValidation, postUser)
userRouter.put('/:id', checkUser, userValidationUpdate, putUser)
userRouter.put('/:id/check-inactive', checkUser, putInactive)
userRouter.delete('/:id', checkUser, deleteUser)

export default userRouter