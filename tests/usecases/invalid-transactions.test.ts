import { createTransactionUseCase } from "../../src/app/usecases/create-transaction.usecase";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('createTransactionUseCase - casos inválidos', () => {
    let outOfStockProductId: string;

    beforeAll(async () => {
        const product = await prisma.product.create({
            data: {
                name: `Producto sin stock ${Date.now()}`,
                description: 'Este producto no tiene unidades disponibles',
                price: 50000,
                stock: 0,
            },
        });

        outOfStockProductId = product.id;
    });

    afterAll(async () => {
        await prisma.transaction.deleteMany();
        await prisma.product.deleteMany();
        await prisma.$disconnect();
    });

    it('debería lanzar error si el producto no existe', async () => {
        await expect(
            createTransactionUseCase({
                productId: 'non-existent-id',
                customerEmail: 'cliente@test.com',
                deliveryInfo: 'Calle falsa 123',
                amount: 10000,
            }),
        ).rejects.toThrow('Producto no encontrado');
    });

    it('debería lanzar error si el stock del producto es 0', async () => {
        await expect(
            createTransactionUseCase({
                productId: outOfStockProductId,
                customerEmail: 'cliente@test.com',
                deliveryInfo: 'Calle falsa 123',
                amount: 50000,
            }),
        ).rejects.toThrow('Producto sin stock disponible');
    });
});