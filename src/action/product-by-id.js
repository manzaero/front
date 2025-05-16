import {server} from "../bff/index.js";
import {selectedProducts} from "./selected-products.js";

export const productById = (id) => async (dispatch) => {
    try {
        const {error, result} = await server.getProduct(id)
        if (error) {
            throw new Error(error.message)
        }
        dispatch(selectedProducts(result))
    } catch (e) {
        console.log(e)
    }
}