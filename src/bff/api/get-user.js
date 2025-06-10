export const getUser = async (emailToFind) => fetch(`/api/users?email=${emailToFind}`)
    .then(loadedUsers => loadedUsers.json())
    .then(users => users[0])