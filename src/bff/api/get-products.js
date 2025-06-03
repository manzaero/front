export const getProducts = async ({ page = 1, limit = 6, search = '' }) => {
    const quest = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search: search
    });

    const res = await fetch(`/products?${quest.toString()}`);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};