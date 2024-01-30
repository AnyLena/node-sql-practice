import express from 'express';
import { getOrders, getOrder } from '../controllers/orderController.js';
const orderRouter = express.Router()

orderRouter.get('/', getOrders)
orderRouter.get('/:id', getOrder)

export default orderRouter