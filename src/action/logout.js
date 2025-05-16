import {ACTION_TYPE} from "./action-type.js";
import {server} from "../bff/index.js";

export const logout = (session) => async (dispatch) => {
    localStorage.removeItem("cart");
    await server.logout(session)
    dispatch({
        type: ACTION_TYPE.LOGOUT,
    })
}