import { Request, Response } from "express";
import { getProductsUseCase } from '../usecases/get-products.usecase'

export const getAllProducts = async (_: Request, res: Response) => {
    const result = await getProductsUseCase()
    res.json(result)
}