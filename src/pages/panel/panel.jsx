import styled from "styled-components";
import {Button, Loader, Title} from "../../components/index.js";
import {useEffect, useState} from "react";
import {server} from "../../bff/index.js";
import {addProduct, loadCategories, loadProducts} from "../../action/index.js";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories, selectLoadProducts} from "../../selectors/index.js";
import {productImages} from "../../assets/product-image/index.js";
import {icons} from "../../assets/icon/index.js";


const AdminPanelContainer = ({className}) => {
    const [errorLoadProducts, setErrorLoadProducts] = useState(null);
    const [errorLoadCategory, setErrorLoadCategory] = useState(null);
    const dispatch = useDispatch();
    const products = useSelector(selectLoadProducts)
    const categories = useSelector(selectCategories);
    const [changeProduct, setChangeProduct] = useState({});
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        image_url: '',
        price: "",
        count: "",
        product_description: ''
    });
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCategory, setLoadingCategory] = useState(true);

    const handleChange = (id, field, value) => {
        setChangeProduct(prev => ({
            ...prev,
            [id]: {
                ...products.find(p => p.id === id),
                ...prev[id],
                [field]: value
            }
        }))
    }

    const handleSave = async (id) => {
        const updatedProduct = changeProduct[id]
        if (!updatedProduct) {
            return;
        }
        const {error} = await server.changeProduct(id, updatedProduct)
        if (error) {
            console.log("error saving product", error)
        } else {
            console.log("product saving success")
        }
    }

    const handleProductChange = (field, value) => {
        setNewProduct(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const {
            name,
            category,
            image_url,
            price,
            count,
            product_description
        } = newProduct
        if (!name || !category || !image_url || !price || !count || !
            product_description) {
            console.log('not data fields')
            return
        }
        const newItem = {
            ...newProduct,
            price: +price,
            count: +count
        }
        console.log(newItem)
        const {error, result} = await server.addProduct(newItem)

        if (error) {
            console.log('err add product')
        } else if (result && result.id) {
            console.log(newProduct)
            dispatch(addProduct(result))
        } else {
            console.log('adding prod', result)
        }

        setNewProduct({
            name: '',
            category: '',
            image_url: '',
            price: '',
            count: '',
            product_description: ''
        })
    }


    useEffect(() => {
        server.loadProducts().then(({error, result}) => {
            setLoadingProducts(false)
            if (error) {
                setErrorLoadProducts(`product loading error: ${error}`);
                return;
            }
            if (Array.isArray(result)) {
                dispatch(loadProducts(result));
            } else {
                console.error("data structure:", result);
            }
        });
        server.loadCategories().then(({error, result}) => {
            setLoadingCategory(false)
            if (error) {
                setErrorLoadCategory('error load products')
                return
            }
            if (Array.isArray(result)) {
                dispatch(loadCategories(result));
            } else {
                console.error("category structure:", result);
            }
        })
    }, [dispatch])

    const handleDeleteProduct = async (id) => {
        const {error} = await server.removeProduct(id);
        if (error) {
            console.log(error)
            return
        } else {
            console.log('deleting successfully')
            dispatch(loadProducts(products.filter(p => p.id !== id)))
        }

    }

    return (
        <div className={className}>
            <Title>{"Admin panel"}</Title>

            <form action="" onSubmit={handleAddProduct}
                  className="add-product-form">
                <input type="text"
                       value={newProduct.name}
                       placeholder="Product name"
                       onChange={e => handleProductChange("name", e.target.value)}
                />
                <select
                    value={newProduct.category}
                    onChange={e => handleProductChange("category", e.target.value)}
                >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.category}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <input type="text"
                       value={newProduct.image_url}
                       placeholder="Product image"
                       onChange={e => handleProductChange("image_url", e.target.value)}
                />
                <input type="text"
                       value={newProduct.price}
                       placeholder="Product price"
                       onChange={e => handleProductChange("price", e.target.value)}
                />
                <input type="text"
                       value={newProduct.product_description}
                       placeholder="Product description"
                       className='description_input'
                       onChange={e => handleProductChange("product_description", e.target.value)}
                />
                <input type="text"
                       value={newProduct.count}
                       placeholder="Product count"
                       onChange={e => handleProductChange("count", e.target.value)}
                />
                <Button width={"240"} type="submit">{"Create"}</Button>
            </form>

            {(loadingProducts || loadingCategory) ? (
                <div>
                    <Loader/>
                </div>
            ) : errorLoadProducts ? (
                <div>Error loading products</div>
            ) : (
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        errorLoadProducts ? (
                            <div>Error loading or products not found</div>
                        ) : (
                            products.map((item) => {
                                const current = changeProduct[item.id] || item;
                                return (<tr key={item.id}>
                                    <td>
                                        <div className="product-info">
                                            <img
                                                src={productImages[current.image_url.replace('.png', '')]}
                                                alt="item.name"/>
                                            <div>
                                                <input
                                                    value={current.name}
                                                    onChange={e => handleChange(item.id, "name", e.target.value)}
                                                />
                                                <p className="sku">
                                                    <span>Category:</span>
                                                    <select
                                                        value={current.category}
                                                        onChange={e => handleChange(item.id, "category", e.target.value)}
                                                    >
                                                        {!errorLoadCategory ?
                                                            categories.map((category) => (
                                                                <option
                                                                    key={category.id}
                                                                    value={category.category}>
                                                                    {category.name}
                                                                </option>
                                                            )) : errorLoadCategory
                                                        }
                                                    </select>
                                                </p>
                                                <p className="sku">
                                                    <span>Image</span>:
                                                    <select
                                                        value={current.image_url}
                                                        onChange={e => handleChange(item.id, "image_url", e.target.value)}
                                                    >
                                                        {Object.keys(productImages).map((imgKey) => (
                                                            <option key={imgKey}
                                                                    value={`${imgKey}.png`}>
                                                                {imgKey}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <input value={current.price}
                                               onChange={e => handleChange(item.id, "price", +e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <div className="quantity-control">
                                            <button
                                                onClick={() => handleChange(item.id, "count", Math.max(current.count - 1, 0))}>-
                                            </button>
                                            <span>{current.count}</span>
                                            <button
                                                onClick={() => handleChange(item.id, "count", current.count + 1)}>+
                                            </button>
                                        </div>
                                    </td>
                                    <td className="total">${current.price * current.count}.00</td>
                                    <td className="btn-save">
                                        <Button children={"Save"}
                                                width={"90"}
                                                onClick={() => handleSave(current.id)}
                                        />
                                        <div className="delete-btn">
                                            <button
                                                onClick={() => handleDeleteProduct(item.id)}>
                                                <img
                                                    src={icons.delete}
                                                    alt=""/></button>
                                        </div>
                                    </td>
                                </tr>)
                            })
                        )
                    }
                    </tbody>
                </table>
            )}

        </div>
    )
}

export const AdminPanel = styled(AdminPanelContainer)`
    .cart-table {
        width: 100%;
        border-collapse: collapse;
    }

    select {
        width: 100%;
        padding: 4px 20px;
    }

    input {
        appearance: none;
        border: 0;
        outline: 0;
        font: inherit;
        width: 15rem;
        height: 20px;
        padding: 1rem 4rem 1rem 1rem;
        background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
        linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
        color: #46A358;
        border-radius: 0.5em;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

        &::-ms-expand {
            display: none;
        }

        &:hover {
            background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em,
            linear-gradient(to left, var(--arrow-bg) 3em, var(--hover-bg) 3em);
            box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 8px var(--focus-shadow);
            transform: scale(1.02);
        }

        option {
            color: inherit;
            background-color: var(--option-bg);
        }
    }

    .cart-table th,
    .cart-table td {
        padding: 5px;
        margin-bottom: -1px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    .product-info {
        display: flex;
        align-items: center;
    }

    .product-info img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 8px;
    }

    .product-name {
        font-weight: bold;
    }

    .sku {
        font-size: 12px;
        color: gray;
        display: flex;

        span {
            font-weight: 600;
        }
    }

    .quantity-control {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .quantity-control button {
        background: green;
        color: white;
        border: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-size: 16px;
        cursor: pointer;
    }

    .total {
        color: green;
        font-weight: bold;
    }

    .delete-btn {
        button {
            background: none;
            border: none;
            font-size: 18px;
            cursor: pointer;
            color: gray;
            margin: 5px 0 0 5px;
        }
    }

    .delete-btn:hover {
        color: red;
    }

    .btn-save {
        display: flex;
        height: 138px;
        align-items: center;
        justify-content: space-evenly;
    }

    .add-product-form {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1px;
        margin-bottom: 24px;

        select {
            width: 240px;
            height: 45px;
        }
    }

    input {
        height: 45px;
    }


`