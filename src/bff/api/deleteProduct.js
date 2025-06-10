export const deleteProduct = async (id) => {
    return await fetch(`http://localhost:3001/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}