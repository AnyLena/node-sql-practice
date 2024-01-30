import express from 'express';
import { getOrders, getOrder, postOrder, putOrder, deleteOrder } from '../controllers/orderController.js';
const orderRouter = express.Router()

orderRouter.get('/', getOrders)
orderRouter.get('/:id', getOrder)
orderRouter.post('/', postOrder)
orderRouter.put('/:id', putOrder)
orderRouter.delete('/:id', deleteOrder)

export default orderRouter