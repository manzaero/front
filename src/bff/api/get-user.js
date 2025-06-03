export const getUser = async (emailToFind) => fetch(`/users?email=${emailToFind}`)
    .then(loadedUsers => loadedUsers.json())
    .then(users => users[0])