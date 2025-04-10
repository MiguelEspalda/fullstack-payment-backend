import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import { productRoutes } from '../src/app/routes/product.routes'
import { transactionRoutes } from '../src/app/routes/transaction.routes'
import { errorHandler } from './shared/middlewares/error.middleware'
import helmet from 'helmet'


dotenv.config()
const app = express()

app.use(helmet())
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT'],
}))
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/transactions', transactionRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`)
})