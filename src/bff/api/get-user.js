export const getUser = async (emailToFind) => fetch(`http://localhost:3005/users?email=${emailToFind}`)
    .then(loadedUsers => loadedUsers.json())
    .then(users => users[0])