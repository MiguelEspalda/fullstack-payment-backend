import { createTransactionUseCase } from '../../src/app/usecases/create-transaction.usecase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('createTransactionUseCase', () => {
    let productId: string;

    beforeEach(async () => {
        // Crear un producto con nombre único y stock suficiente
        const product = await prisma.product.create({
            data: {
                name: `Producto de prueba ${Date.now()}`,
                description: 'Descripción',
                price: 100,
                stock: 5,
            },
        });

        productId = product.id;
    });

    afterEach(async () => {
        // Limpiar la base de datos después de cada test
        await prisma.transaction.deleteMany();
        await prisma.product.deleteMany();
    });

    afterAll(async () => {
        // Cerrar conexión al final de todos los tests
        await prisma.$disconnect();
    });

    it('should create a transaction in PENDING status', async () => {
        const transaction = await createTransactionUseCase({
            productId,
            customerEmail: 'test@test.com',
            deliveryInfo: 'Calle falsa 123',
            amount: 100,
        });

        expect(transaction.status).toBe('PENDING');
        expect(transaction.productId).toBe(productId);
        expect(transaction.customerEmail).toBe('test@test.com');
    });
});
