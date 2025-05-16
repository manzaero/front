export const getCategories = () => fetch('http://localhost:3005/categories').then(res => res.json())
