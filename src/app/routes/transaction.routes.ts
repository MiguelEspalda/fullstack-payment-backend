import { Router } from "express";
import { createTransaction, updateTransaction, getAllTransactions } from '../controllers/transaction.controller'

export const transactionRoutes = Router()

transactionRoutes.get('/', getAllTransactions)
transactionRoutes.post('/', createTransaction)
transactionRoutes.put('/:id', updateTransaction)