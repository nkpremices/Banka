// Functions to shift the sign in and sign up parts
const signIn = () => {
    //changing the navigation display
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-active';
    document.getElementById('signup-nav').className = 'li nav-inactive';

    //shifting to the sign in part
    document.querySelector('.signup-form').className = 'hide';
    document.querySelector('.signin-form').className = 'signin-form';
};

const signUp = () => {
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-inactive';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-active';

    //shifting to the signup part
    document.querySelector('.form .hide').className = 'signup-form';
    document.querySelector('.signin-form').className = 'signin-form hide';
};

// Going to sign in from the form
document.getElementById('go-to-signin').addEventListener('click', signIn);

// Going to sign up from the form
document.getElementById('go-to-signup').addEventListener('click', signUp);

