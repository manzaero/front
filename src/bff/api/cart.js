export const sendCartToServer = async (userId, cart) => {
    try {
        const cartToSend = {
            id: userId,
            sum: Array.isArray(cart?.items)
                ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
                : 0,
            items: Array.isArray(cart?.items)
                ? cart.items.map(item => ({
                    ...item,
                    image_url: item.imageUrl,
                }))
                : [],

        };

        const res = await fetch(`http://localhost:3001/api/cart/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(cartToSend),
        });

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`);
        }

        const result = await res.json();
        return { error: null, result };
    } catch (e) {
        console.error('Error sending cart to server:', e);
        return { error: e.message, result: null };
    }
};
