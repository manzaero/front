export const getProducts = async () =>
    await fetch('http://localhost:3005/products')
        .then(res => res.json())