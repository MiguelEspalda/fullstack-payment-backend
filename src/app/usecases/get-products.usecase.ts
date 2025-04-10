import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProductsUseCase = async () => {
    return await prisma.product.findMany();
};
