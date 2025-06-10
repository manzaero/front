export const getUsers = () =>
    fetch('/api/users')
        .then(loadedUsers => loadedUsers.json())