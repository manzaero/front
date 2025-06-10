import { request } from '../../utils/request.js';

export const getCategories = async () => {
    try {
        const { error, result } = await request('http://localhost:3001/api/categories');
        if (error) {
            throw new Error(`Failed to fetch categories: ${error}`);
        }
        return result;
    } catch (e) {
        return {
            error: e.message,
            result: null
        };
    }
};