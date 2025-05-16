export const mixProduct = async (id, data) => await
    fetch(`http://localhost:3005/products/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
    })
