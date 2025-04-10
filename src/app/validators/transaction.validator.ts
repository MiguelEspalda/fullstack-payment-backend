import { z } from 'zod';

export const CreateTransactionSchema = z.object({
    productId: z.string().uuid(),
    customerEmail: z.string().email(),
    deliveryInfo: z.string().min(5),
    amount: z.number().min(1),
});

export const UpdateTransactionSchema = z.object({
    status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
    wompiId: z.string(),
});
