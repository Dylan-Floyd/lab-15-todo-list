import { 
    completeTodo,
    addTodo,
    getTodos,
    getActiveUser,
    saveTodos,
    saveUser,
    USERS_LS_KEY, 
    ACTIVE_USER_LS_KEY, 
    setActiveUser } from '../local-storage-utils.js';

const test = QUnit.test;

test('saveUser should save add a new user to local storage', (assert) => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

    const user = {
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
    
    const expected = [
        user
    ];

    saveUser(user);

    const actual = JSON.parse(localStorage.getItem(USERS_LS_KEY));

    assert.deepEqual(actual, expected);
});

test('saveUser should update existing users in local storage', (assert) => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

    const existingUser = {
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
    saveUser(existingUser);
    existingUser.name = 'bobbie';
    saveUser(existingUser);

    const expected = [
        {
            id: 1,
            name: 'bobbie',
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
        }
    ];

    const actual = JSON.parse(localStorage.getItem(USERS_LS_KEY));

    assert.deepEqual(actual, expected);
});

test('getActiveUser should return the user from local storage', (assert) => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

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
    
    localStorage.setItem(USERS_LS_KEY, JSON.stringify([expected]));
    localStorage.setItem(ACTIVE_USER_LS_KEY, 1);

    const actual = getActiveUser();

    assert.deepEqual(actual, expected);
});

test('setActiveUser should store the id of the active user in local storage', (assert) => {
    localStorage.removeItem(ACTIVE_USER_LS_KEY); //reset storage

    const expected = 1;
    
    setActiveUser(1);

    const actual = Number(localStorage.getItem(ACTIVE_USER_LS_KEY));

    assert.deepEqual(actual, expected);
});

test('saveTodos should replace the todos of a user object in local storage', (assert) => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

    const initialUsersArray = [{
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
    }];
    localStorage.setItem(USERS_LS_KEY, JSON.stringify(initialUsersArray));
    setActiveUser(1);

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

    const actual = getActiveUser();
    assert.deepEqual(actual, expected);
});

test('getTodos should return the todos from the user object in local storage', assert => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

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

test('addTodo should add a todo to the user object in local storage', assert => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

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
    setActiveUser(1);
    
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

    const actual = getActiveUser();
    assert.deepEqual(actual, expected);
});

test('completeTodo should mark a todo as completed', assert => {
    localStorage.removeItem(USERS_LS_KEY); //reset storage

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

    const actual = getActiveUser();
    assert.deepEqual(actual, expected);
});