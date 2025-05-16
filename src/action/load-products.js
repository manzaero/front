import {ACTION_TYPE} from "./action-type.js";

export const loadProducts = (products) => ({
    type: ACTION_TYPE.LOAD_PRODUCTS,
    payload: products
})