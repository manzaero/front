import { server } from "../bff/index.js";
import { ACTION_TYPE } from "../action/index.js";

export const fetchProductById = (id) => async (dispatch) => {
    try {
        const { error, result } = await server.getProduct(id);
        if (error || !result) {
            dispatch({ type: ACTION_TYPE.PRODUCT_NOT_FOUND });
        } else {
            dispatch({ type: ACTION_TYPE.SELECT_PRODUCT, payload: result });
        }
    } catch (e) {
        console.error(e);
        dispatch({ type: ACTION_TYPE.PRODUCT_NOT_FOUND });
    }
};
