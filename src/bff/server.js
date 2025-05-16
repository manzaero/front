import {sessions} from "./sessions.js";
import {
    addUser,
    createProduct,
    deleteProduct,
    getCategories,
    getProducts,
    getUser,
    mixProduct
} from "./api/input.js";


export const server = {
    async logout(session) {
        sessions.remove(session);

    },
    async authorize(authEmail, authPassword) {
        const user = await getUser(authEmail, authPassword);
        if (!user) {
            return {
                error: 'No user found.', result: null
            }
        }
        if (authPassword !== user.password) {
            return {
                error: 'Wrong password', result: null
            }
        }

        return {
            error: null, result: {
                id: user.id,
                login: user.login,
                email: user.email,
                roleId: user.role_id,
                session: sessions.create(user),
            }
        }
    }, async register(regLogin, regEmail, regPassword) {
        localStorage.removeItem("cart");
        const existedUser = await getUser(regEmail);

        if (existedUser) {
            return {
                error: "This email is busy", result: null
            }
        }


        const user = await addUser(regLogin, regEmail, regPassword);


        return {
            error: null, result: {
                id: user.id,
                email: user.email,
                login: user.login,
                roleId: user.role_id,
                session: sessions.create(user),
            }
        }
    },
    async loadProducts() {
        try {
            const savedProducts = localStorage.getItem("products");

            if (savedProducts) {
                try {
                    const parsed = JSON.parse(savedProducts);
                    return {
                        error: null,
                        result: parsed
                    };
                } catch (parseError) {
                    console.warn("Ошибка парсинга localStorage, гружу с сервака", parseError);
                    localStorage.removeItem("products");
                }
            }

            const products = await getProducts();

            localStorage.setItem("products", JSON.stringify(products));

            return {
                error: null,
                result: products
            };
        } catch (e) {
            return {
                error: e.message,
                result: null
            };
        }
    },
    async loadCategories() {
        try {
            const categories = await getCategories();
            return {
                error: null,
                result: categories
            }
        } catch (e) {
            return {
                error: e.message,
                result: null
            }
        }
    },
    async changeProduct(id, data) {
        localStorage.removeItem("products");
        try {
            const updateProduct = await mixProduct(id, data)
            return {
                error: null,
                result: updateProduct
            }
        } catch (e) {
            return {
                error: e.message,
                result: null
            }
        }
    },
    async addProduct(product) {
        localStorage.removeItem("products");
        try {
            const res = await createProduct(product)

            return {
                error: null,
                result: {
                    id: res.id,
                    name: res.name,
                    image_url: res.image_url,
                    product_description: res.product_description,
                    count: res.count,
                    price: res.price,
                    category: res.category
                }
            }
        } catch (e) {
            console.log(e.message)
            return {
                e,
                result: null
            }
        }
    },
    async removeProduct(id) {
        localStorage.removeItem("products");
        try {
            const res = await deleteProduct(id);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return {
                error: null,
                result: true
            }
        } catch (e) {
            console.log(e)
            return {
                e: e.message,
                result: null
            }
        }
    },
    async getProduct(id) {
        try {
            const res = await fetch(`http://localhost:3005/products/${id}`);
            if (!res.ok) throw new Error('Product not found');
            const product = await res.json();
            return {
                error: null,
                result: product
            };
        } catch (e) {
            return {
                error: e.message,
                result: null
            };
        }
    }

}