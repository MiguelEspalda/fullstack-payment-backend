import { Router } from "express";
import { getAllProducts } from '../controllers/product.controller'

export const productRoutes = Router()

productRoutes.get('/', getAllProducts)