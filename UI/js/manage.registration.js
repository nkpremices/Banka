// fetching a variable comming from the home page
const params = location.search.substring(1).split("&");
const temp = params[0].split("=");
const hide = temp[1];

// A variable to fetch actions on the registration page
let registration;

// Functions to shift the sign in and sign up parts
const signIn = () => {
    //changing the navigation display
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-active';
    document.getElementById('signup-nav').className = 'li nav-inactive';

    //shifting to the sign in part
    document.querySelector('.signup-form').className = 'hide';
    document.querySelector('.signin-form').className = 'signin-form';

    registration = true;
};

const signUp = () => {
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-active';

    //shifting to the signup part
    document.querySelector('.form .hide').className = 'signup-form';
    document.querySelector('.signin-form').className = 'signin-form hide';

    registration = true;
};

// a funtion to return back on the home page
const backToHome = () => {
    window.location = '../index.html';
};


// Going to sign in from the form
document.getElementById('go-to-signin').addEventListener('click', signIn);

// Going to sign up from the form
document.getElementById('go-to-signup').addEventListener('click', signUp);

// Going to the home page
document.getElementById('home-nav').addEventListener('click', backToHome);

// Going to sign up from the navigation
document.getElementById('signup-nav').addEventListener('click', signUp);

// Going to sign in from the navigation
document.getElementById('signin-nav').addEventListener('click', signIn);

// Trynig to see which form will be hide
if(!registration){
    if(hide) signIn();
}