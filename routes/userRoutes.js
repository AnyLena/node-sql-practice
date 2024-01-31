import express from 'express';
import { getUsers, getUser, postUser, putUser, putInactive, deleteUser, getUserOrders, userValidation, userValidationUpdate } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.get('/:id/orders', getUserOrders)
userRouter.post('/', userValidation, postUser)
userRouter.put('/:id',userValidationUpdate, putUser)
userRouter.put('/:id/check-inactive', putInactive)
userRouter.delete('/:id', deleteUser)

export default userRouter