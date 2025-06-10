import { request } from '../../utils/request.js';

export const getProducts = async ({ page = 1, limit = 6, search = '', category = '' }) => {
    const quest = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        category
    });

    const { error, result } = await request(`http://localhost:3001/api/products?${quest.toString()}`);

    if (error) {
        throw new Error(`Failed to fetch products: ${error}`);
    }

    return result;
};
