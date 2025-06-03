export const getCategories = () => fetch('/categories').then(res => res.json())
