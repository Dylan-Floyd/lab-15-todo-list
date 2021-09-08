// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { 
    completeTodo,
    addTodo,
    getTodos,
    getUser,
    saveTodos,
    saveUser,
    USER_LS_KEY } from '../local-storage-utils.js';

const test = QUnit.test;

test('saveUser should save the user to local storage', (assert) => {
    const expected = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
            {
                id: 222222,
                text: 'read How to Win Friends and Influence Others',
                completed: false
            }
        ]
    };
    
    saveUser(expected);

    const actual = JSON.parse(localStorage.getItem(USER_LS_KEY));

    assert.deepEqual(actual, expected);
});

test('getUser should return the user from local storage', (assert) => {
    const expected = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
            {
                id: 222222,
                text: 'read How to Win Friends and Influence Others',
                completed: false
            }
        ]
    };
    
    localStorage.setItem(USER_LS_KEY, JSON.stringify(expected));

    const actual = getUser();

    assert.deepEqual(actual, expected);
});

test('saveTodos should replace the todos of a user object in local storage', (assert) => {
    const initialUserObject = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: false
            },
        ]
    };
    localStorage.setItem(USER_LS_KEY, JSON.stringify(initialUserObject));

    const newTodos = [
        {
            id: 2,
            text: 'find purpose in life',
            completed: true
        },
        {
            id: 44444444444,
            text: 'meet more bobs',
            completed: false
        },
    ];
    saveTodos(newTodos);

    const expected = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
        ]
    };

    const actual = getUser();
    assert.deepEqual(actual, expected);
});

test('getTodos should return the todos from the user object in local storage', assert => {
    const initialUserObject = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
        ]
    };
    saveUser(initialUserObject);

    const expected = [
        {
            id: 2,
            text: 'find purpose in life',
            completed: true
        },
        {
            id: 44444444444,
            text: 'meet more bobs',
            completed: false
        },
    ];

    const actual = getTodos();
    assert.deepEqual(actual, expected);
});

test('completeTodo should mark a todo as completed', assert => {
    const initialUserObject = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
        ]
    };
    saveUser(initialUserObject);
    
    const todoToAdd = {
        id: 222222,
        text: 'read How to Win Friends and Influence Others',
        completed: false
    };
    addTodo(todoToAdd);

    const expected = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
            {
                id: 222222,
                text: 'read How to Win Friends and Influence Others',
                completed: false
            }
        ]
    };

    const actual = getUser();
    assert.deepEqual(actual, expected);
});

test('addTodo should add a todo to the user object in local storage', assert => {
    const initialUserObject = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: false
            },
        ]
    };
    saveUser(initialUserObject);
    
    completeTodo(44444444444);

    const expected = {
        id: 1,
        name: 'bob',
        password: 'bobs united strong',
        todos: [
            {
                id: 2,
                text: 'find purpose in life',
                completed: true
            },
            {
                id: 44444444444,
                text: 'meet more bobs',
                completed: true
            },
        ]
    };

    const actual = getUser();
    assert.deepEqual(actual, expected);
});