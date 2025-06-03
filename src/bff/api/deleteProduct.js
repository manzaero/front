export const deleteProduct = async (id) => {
    return await fetch(`/products/${id}`, {
        method: 'DELETE'
    })
}