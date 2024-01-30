import express from 'express';
import { getOrders, getOrder, postOrder } from '../controllers/orderController.js';
const orderRouter = express.Router()

orderRouter.get('/', getOrders)
orderRouter.get('/:id', getOrder)
orderRouter.post('/', postOrder)

export default orderRouter