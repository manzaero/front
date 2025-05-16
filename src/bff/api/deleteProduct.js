export const deleteProduct = async (id) => {
    return await fetch(`http://localhost:3005/products/${id}`, {
        method: 'DELETE'
    })
}