import { updateTransactionUseCase } from '../../src/app/usecases/update-transaction.usecase';
import { createTransactionUseCase } from '../../src/app/usecases/create-transaction.usecase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('updateTransactionUseCase', () => {
    let transactionId: string;
    let productId: string;

    beforeEach(async () => {
        await prisma.transaction.deleteMany();
        await prisma.product.deleteMany();

        const product = await prisma.product.create({
            data: {
                name: `Producto para update ${Date.now()}`,
                description: 'Para pruebas de actualización',
                price: 60000,
                stock: 2,
            },
        });

        productId = product.id;
        const transaction = await createTransactionUseCase({
            productId,
            customerEmail: 'cliente@prueba.com',
            deliveryInfo: 'Calle 123',
            amount: 60000,
        });

        transactionId = transaction.id;
    });

    afterEach(async () => {
        await prisma.$disconnect();
    });

    it('debería actualizar el estado de la transacción a SUCCESS y reducir stock', async () => {
        const updated = await updateTransactionUseCase(transactionId, {
            status: 'SUCCESS',
            wompiId: 'tx_test_success',
        });

        expect(updated.status).toBe('SUCCESS');
        expect(updated.wompiId).toBe('tx_test_success');

        const product = await prisma.product.findUnique({
            where: { id: updated.productId },
        });

        expect(product?.stock).toBe(1);
    });

    it('debería fallar si la transacción no existe', async () => {
        await expect(
            updateTransactionUseCase('non-existent-id', {
                status: 'FAILED',
                wompiId: 'tx_fail_test',
            }),
        ).rejects.toThrow();
    });
});
