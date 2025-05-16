import {generateDate} from "../generate-date.js";

export const addUser = async (login, email, password) => {
    localStorage.removeItem('cart')

    const res = await fetch('http://localhost:3005/users', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }, body: JSON.stringify({
            login: login,
            email: email,
            password: password,
            registered_at: generateDate(),
            role_id: 2
        })
    })

    const newUser = await res.json()


    await fetch('http://localhost:3005/cart', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: newUser.id,
            items: [],
            sum: 0
        })
    })
    return newUser
}