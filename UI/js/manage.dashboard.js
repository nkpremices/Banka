// a funtion to return back on the home page
const backToHome = () => {
    window.location = '../index.html';
};

// A function to create an account
const createAccount = () => {
        document.querySelector('.overlay').className = 'overlay';
        document.querySelector('.form').className = 'form to-right';
        document.querySelector('.create-account-form').className = 'create-account-form';
}

// A function to destroy the create account message box
const destroyCreateAccountBox = () => {
    document.querySelector('.form').className = 'form to-right hide';
    document.querySelector('.create-account-form').className = 'create-account-form hide';
}

// Going to the home page
document.getElementById('logo').addEventListener('click', backToHome);
document.getElementById('app-name').addEventListener('click', backToHome);

document.querySelector('#search').addEventListener('click', () => {
    //Showing the search field
        document.querySelector('.header-right .hide').className = 'search' ;
        document.querySelector('#search').className = 'hide' ;
});

// Creating an account
document.querySelector('.new-account').addEventListener('click', createAccount);

// Destroying the overlay
document.querySelector('.fa-times').addEventListener('click', () => {
    document.querySelector('.overlay').className = 'overlay hide';
});

// Destroying the Create account message box
document.querySelector('.create-account-form .form-body .fa-times')
    .addEventListener('click', destroyCreateAccountBox);

