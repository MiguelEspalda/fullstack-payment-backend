import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface CreateTransactionDTO {
    productId: string
    customerEmail: string
    deliveryInfo: string
    amount: number
}

export const createTransactionUseCase = async(data: CreateTransactionDTO) => {
    const { productId, customerEmail, deliveryInfo, amount } = data

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if(!product) throw new Error('Producto no encontrado')
    if(product.stock <= 0) throw new Error('Producto sin stock disponible')

    const transaction = await prisma.transaction.create({
        data: {
            productId,
            customerEmail,
            deliveryInfo,
            amount,
            status: 'PENDING'
        },
    })

    return transaction
}