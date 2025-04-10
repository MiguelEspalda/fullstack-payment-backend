import { NextFunction, Request, Response } from "express";
import { createTransactionUseCase } from '../usecases/create-transaction.usecase'
import { updateTransactionUseCase } from '../usecases/update-transaction.usecase'
import { getTransactionsUseCase } from '../usecases/get-transactions.usecase'
import { CreateTransactionSchema, UpdateTransactionSchema } from "../validators/transaction.validator";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = CreateTransactionSchema.parse(req.body);
        const result = await createTransactionUseCase(body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

export const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = UpdateTransactionSchema.parse(req.body);
        const result = await updateTransactionUseCase(req.params.id, body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const getAllTransactions = async (_: Request, res: Response) => {
    try {
        const result = await getTransactionsUseCase()
        res.status(200).json(result)
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
}