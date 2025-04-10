import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            name: 'Camiseta edición limitada',
            description: 'Camiseta oficial de Wompi edición 2024',
            price: 75000,
            stock: 10,
        },
        {
            name: 'Gorra Wompi',
            description: 'Gorra bordada color negro con logo',
            price: 40000,
            stock: 15,
        },
        {
            name: 'Sticker pack',
            description: '5 stickers creativos edición limitada',
            price: 15000,
            stock: 30,
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { name: product.name },
            update: {},
            create: product,
        });
    }

    console.log('Productos insertados');
}

main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
