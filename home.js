import { loginUser, signupUser } from './local-storage-utils.js';

// import functions and grab DOM elements
const form = document.querySelector('#login-signup-form');
const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');
const errorMessage = document.querySelector('label.error-message');
const BAD_LOGIN_MESSAGE = 'Invalid credentials. Please try again.';
const BAD_SIGNUP_MESSAGE = 'That username is taken. Please use a different one.';

// initialize global state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
loginButton.addEventListener('click', () => {
    const formData = new FormData(form);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');

    if (loginUser(enteredUsername, enteredPassword)) {
        window.location = './todos/';
    } else {
        errorMessage.innerText = BAD_LOGIN_MESSAGE;
        errorMessage.classList.remove('hidden');
    }
});

signupButton.addEventListener('click', () => {
    const formData = new FormData(form);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');

    if (signupUser(enteredUsername, enteredPassword)) {
        window.location = './todos/';
    } else {
        errorMessage.innerText = BAD_SIGNUP_MESSAGE;
        errorMessage.classList.remove('hidden');
    }
});