import { addTodoText, completeTodo, getTodos, getActiveUser } from '../local-storage-utils.js';

const todosUL = document.querySelector('#todos-ul');
const addTodoForm = document.querySelector('#add-todo-form');
const todoInput = document.querySelector('input[type="text"]');

//redirect user to homepage if there's no user set
if (getActiveUser() === null) window.location = '../';

function todoLiClickHandler(e) {
    const todoLi = e.target;
    completeTodo(Number(todoLi.id));
    renderTodos();
}

function createTodoLi(todo) {
    const todoLi = document.createElement('li');
    todoLi.textContent = todo.text;
    todoLi.id = todo.id;
    todoLi.addEventListener('click', todoLiClickHandler);
    if (todo.completed) {
        todoLi.className = 'completed';
    }
    return todoLi;
}

function renderTodos() {
    const todos = getTodos();
    todosUL.textContent = '';
    for (const todo of todos) {
        todosUL.appendChild(createTodoLi(todo));
    }
}

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value;
    if (todoText === '') return;
    todoInput.value = '';
    addTodoText(todoText);
    renderTodos();
});

renderTodos();
