import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const updateTransactionUseCase = async (id: string, data: { status: string; wompiId: string }) => {
    const transaction = await prisma.transaction.update({
        where: { id },
        data: {
            status: data.status,
            wompiId: data.wompiId,
        },
    });

    if (data.status === 'SUCCESS') {
        await prisma.product.update({
            where: { id: transaction.productId },
            data: {
                stock: { decrement: 1 },
            },
        });
    }

    return transaction;
};