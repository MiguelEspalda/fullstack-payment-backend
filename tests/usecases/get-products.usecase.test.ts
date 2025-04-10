import { getProductsUseCase } from "../../src/app/usecases/get-products.usecase";


describe('getProductsUseCase', () => {
    it('should return an array of products', async () => {
        const products = await getProductsUseCase();
        expect(Array.isArray(products)).toBe(true);
    });
});
