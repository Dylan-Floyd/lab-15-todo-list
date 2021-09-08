export function getProbablyUniqueId() {
    return Math.random() * (1 ** 100);
}

export function createUserObject(username, password) {
    return {
        id: getProbablyUniqueId(),
        username,
        password,
        todos: []
    };
}