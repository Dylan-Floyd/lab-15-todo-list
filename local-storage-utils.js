export const USERS_LS_KEY = 'USERS';
export const ACTIVE_USER_LS_KEY = 'USER';

/*
export function saveUser(user) {
    localStorage.setItem(USER_LS_KEY, JSON.stringify(user));
}

export function getUser() {
    return JSON.parse(localStorage.getItem(USER_LS_KEY));
}

export function saveTodos(todos) {
    const user = getUser();
    user.todos = todos;
    saveUser(user);
}

export function getTodos() {
    const user = getUser();
    return user.todos;
}

export function addTodo(todo) {
    const user = getUser();
    user.todos.push(todo);
    saveUser(user);
}

export function completeTodo(todoId) {
    const user = getUser();
    const todo = user.todos.find(todo => { return todo.id === todoId; });
    todo.completed = true;
    saveUser(user);
}
*/

function getProbablyUniqueId() {
    return Math.round(Math.random() * (10 ** 10));
}

function createUserObject(username, password) {
    return {
        id: getProbablyUniqueId(),
        username,
        password,
        todos: []
    };
}

function createTodoObject(todoText) {
    return {
        id: getProbablyUniqueId(),
        text: todoText,
        completed: false
    };
}

export function saveUser(userToSave) {
    const users = getUsers();
    let updatedUsers = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === userToSave.id) {
            users[i] = userToSave;
            updatedUsers = true;
        }
    }
    if (!updatedUsers) {
        users.push(userToSave);
    }
    localStorage.setItem(USERS_LS_KEY, JSON.stringify(users));
}

export function getUsers() {
    const users = JSON.parse(localStorage.getItem(USERS_LS_KEY));
    if (!users) return [];
    return users;
}

export function getActiveUser() {
    const users = getUsers();
    const stringyActiveUserId = localStorage.getItem(ACTIVE_USER_LS_KEY);
    const activeUserId = Number(stringyActiveUserId);
    return users.find(user => { return user.id === activeUserId; });
}

export function setActiveUser(userId) {
    localStorage.setItem(ACTIVE_USER_LS_KEY, userId);
}

export function saveTodos(todos) {
    const user = getActiveUser();
    user.todos = todos;
    saveUser(user);
}

export function getTodos() {
    const user = getActiveUser();
    return user.todos;
}

export function addTodo(todo) {
    const user = getActiveUser();
    user.todos.push(todo);
    saveUser(user);
}

export function addTodoText(todoText) {
    addTodo(createTodoObject(todoText));
}

export function completeTodo(todoId) {
    const user = getActiveUser();
    const todo = user.todos.find(todo => { return todo.id === todoId; });
    todo.completed = true;
    saveUser(user);
}

//Returns true if the login was successful, otherwise returns false
export function loginUser(username, password) {
    const users = getUsers();
    const userData = users.find(user => { return user.username === username; });
    if (!userData) return false;
    if (userData.password !== password) return false;
    setActiveUser(userData.id);
    return true;
}


//Returns true if the signup was successful, otherwise returns false
export function signupUser(username, password) {
    const users = getUsers();
    const userData = users.find(user => { return user.username === username; });
    if (userData) return false;
    const user = createUserObject(username, password);
    saveUser(user);
    setActiveUser(user.id);
    return true;
}