import {ACTION_TYPE} from "./action-type.js";
import {request} from "../utils/request.js";

export const logout = () => async (dispatch) => {
    localStorage.removeItem("cart");
    await request('http://localhost:3001/api/logout', 'POST')
    dispatch({
        type: ACTION_TYPE.LOGOUT,
    })
}