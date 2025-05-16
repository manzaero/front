import {generateDate} from "../generate-date.js";

export const createProduct = async (product) => {
    const res = await fetch(`http://localhost:3005/products/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: generateDate(),
            name: product.name,
            image_url: product.image_url,
            product_description: product.product_description,
            count: product.count,
            price: product.price,
            category: product.category
        })
    })
    return await res.json()
}