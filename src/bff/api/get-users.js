export const getUsers = () =>
    fetch('/users')
        .then(loadedUsers => loadedUsers.json())