import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getTransactionsUseCase = async () => {
    return await prisma.transaction.findMany({
        include: {
            product: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
};
