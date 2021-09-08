export const USER_LS_KEY = 'USER';

//store the user to localStorage
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