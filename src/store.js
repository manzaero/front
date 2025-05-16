import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from "redux-thunk";
import {
    appReducer,
    cartReducer,
    categoriesReducer,
    productReducer,
    productsReducer,
    searchReducer,
    userReducer,
    usersReducer
} from './reducers'
import {sendCartToServer} from "./bff/api/input.js";
import {logout} from "./action/index.js";

const loadingState = () => {
    const realizingState = localStorage.getItem('initialUsersState');
    return realizingState ? JSON.parse(realizingState) : undefined;
}

const saveState = (state) => {
    const realizingState = JSON.stringify(state)
    localStorage.setItem('initialUsersState', realizingState)
}

const reducer = combineReducers({
    app: appReducer,
    user: userReducer,
    users: usersReducer,
    product: productReducer,
    products: productsReducer,
    search: searchReducer,
    categories: categoriesReducer,
    cart: cartReducer

})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, loadingState(), composeEnhancers(applyMiddleware(thunk)));

let prevState = null;

store.subscribe(() => {
    const state = store.getState();
    saveState(state)

    const cart = state.cart
    const userId = state.user?.id

    if (userId && JSON.stringify(prevState) !== JSON.stringify(cart)) {
        sendCartToServer(userId, cart)
            .then(res => logout(res))
        prevState = cart
    }
})