export const mixProduct = async (id, data) => await
    fetch(`/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
