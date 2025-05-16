export const sendCartToServer = async (userId, cart) => {
    try {
        const res = await fetch(`http://localhost:3005/cart/${userId}`)
        if (res.ok) {
            await fetch(`http://localhost:3005/cart/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({id: userId, ...cart})
            })
        } else {
            await fetch('http://localhost:3005/cart', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    id: userId,
                    ...cart
                })
            })
        }
    } catch (e) {
        console.log('error with send cart to server:', e.message)
    }
}