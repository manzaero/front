import { ACTION_TYPE } from "../action/index.js";
import { request } from "../utils/request.js";

export const fetchProductById = (id) => async (dispatch) => {
    try {
        const { error, result } = await request(`http://localhost:3001/api/products/${id}`);

        if (error || !result?.data) {
            dispatch({ type: ACTION_TYPE.PRODUCT_NOT_FOUND });
        } else {
            dispatch({ type: ACTION_TYPE.SELECT_PRODUCT, payload: result.data });
        }
    } catch (e) {
        console.error(e);
        dispatch({ type: ACTION_TYPE.PRODUCT_NOT_FOUND });
    }
};
