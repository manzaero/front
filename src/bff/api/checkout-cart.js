import {clearCart} from "../../action/index.js";

export const checkoutCart = () => async (dispatch, getState) => {
    const {cart, user} = getState()
    if (!user.id) {
        console.log('Login to your personal account')
        return
    }
    try {
        const response = await fetch('localhost:3005/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.id,
                items: cart.items,
                sum: cart.sum,
            })
        })
        if (response.ok) {
            dispatch(clearCart())
        } else {
            console.log('error check')
        }
    } catch (e) {
        console.log(e.message)
    }

}