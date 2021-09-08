import { getUser } from './local-storage-utils.js';

// import functions and grab DOM elements
const form = document.querySelector('#login-signup-form');
const loginButton = document.querySelector('#login-button');
const signupButton = document.querySelector('#signup-button');
const retryDisplay = document.querySelector('input.invalid-creds');
// initialize global state

// set event listeners 
  // get user input
  // use user input to update state 
  // update DOM to reflect the new state
loginButton.addEventListener('click', () => {
    const user = getUser();
    const formData = new FormData(form);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');

    if (user.username === enteredUsername && user.password === enteredPassword) {
        window.location = './todos/';
    } else {
        retryDisplay.classList.remove('hidden');
    }
});