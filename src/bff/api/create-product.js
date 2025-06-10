export const createProduct = async (product) => {
    const res = await fetch(`http://localhost:3001/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        credentials: 'include',
        body: JSON.stringify({
            name: product.name,
            image_url: product.image_url,
            product_description: product.product_description,
            count: product.count,
            price: product.price,
            category: product.category
        })
    })
    console.log('POST payload:', {
        name: product.name,
        image_url: product.image_url,
        product_description: product.product_description,
        count: product.count,
        price: product.price,
        category: product.category
    });

    return await res.json()
}