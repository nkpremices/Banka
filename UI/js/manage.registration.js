// fetching a variable comming from the home page
const params = location.search.substring(1).split("&");
const fromHome = params[0].split("=");
const hide = fromHome[1];

// A variable to fetch actions on the registration page
let registration;
//a variable to fetch variables coming from the reset password page
let resetSuccess;
let fromReset;
if(params[1]) {
    fromReset = params[1].split("=");
    resetSuccess = fromReset[1];
};
// Showing a success message if coming from the reset password page


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

const admin = () => {
    window.location = './admin.login.html';
};

const staff = () => {
    window.location = './staff.login.html';
};

// a funtion to return back on the home page
const backToHome = () => {
    window.location = '../index.html';
};

// Function to dismiss and create the alert messages
const destroyMessageBox = () =>{
    const alert = document.querySelector('.alert');
    alert.style.opacity = '0';
    setTimeout(() => alert.style.display = "none", 1000);
}

const createMessageBox = () =>{
    const alert = document.querySelector('.alert');
    alert.style.display = "inline-block";
    alert.style.opacity = '1';
}

//creating the alert message on success
const createMessageSucces = () => { 
    const message = 'A new password has been sent to the email, please login with that password';
    document.querySelector('.alert .message').innerHTML = message;
    setTimeout(createMessageBox, 800);
};

// Going to sign in from the form
document.getElementById('go-to-signin').addEventListener('click', signIn);

// Going to sign up from the form
document.getElementById('go-to-signup').addEventListener('click', signUp);

// Going to the home page
document.getElementById('home-nav').addEventListener('click', backToHome);
document.getElementById('logo').addEventListener('click', backToHome);
document.getElementById('app-name').addEventListener('click', backToHome);

// Going to sign up from the navigation
document.getElementById('signup-nav').addEventListener('click', signUp);

// Going to sign in from the navigation
document.getElementById('signin-nav').addEventListener('click', signIn);

// Going to the admin login page in from the navigation
document.getElementById('admin-nav').addEventListener('click', admin);

// Going to the staff login page in from the navigation
document.getElementById('staff-nav').addEventListener('click', staff);


// Creating the success message on creation of an account
if(resetSuccess) createMessageSucces();

//destroying the alert message
document.querySelector('.alert .to-right').addEventListener('click', destroyMessageBox);

// Trynig to see which form will be hide
if(!registration){
    if(hide) signIn();
}