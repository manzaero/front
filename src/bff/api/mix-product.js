export const mixProduct = async (id, data) => {
    const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update product');
    }

    const result = await response.json();
    return result.data;
};
