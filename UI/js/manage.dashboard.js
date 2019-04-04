let reverse = true;

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
    destroyOverlay();
}

// Going to the home page
document.getElementById('logo').addEventListener('click', backToHome);
document.getElementById('app-name').addEventListener('click', backToHome);


// A function go to the transactions
const transactions = () => {
    // changing the display of the navigation
    document.getElementById('profile-nav').className = 'side-inactive';
    document.getElementById('transactions-nav').className = 'side-active';
    document.getElementById('accounts-nav').className = 'side-inactive';

    //displayng the content
    document.querySelector('.content').className = 'content hide';
    document.querySelector('.accounts').className = 'accounts hide';
    document.querySelector('.transactions').className = 'transactions';
}

// A function go to the transactions
const accounts = () => {
    // changing the display of the navigation
    document.getElementById('profile-nav').className = 'side-inactive';
    document.getElementById('transactions-nav').className = 'side-inactive';
    document.getElementById('accounts-nav').className = 'side-active';

    //displayng the content
    document.querySelector('.content').className = 'content hide';
    document.querySelector('.transactions').className = 'transactions hide';
    document.querySelector('.accounts').className = 'accounts to-right';
    
}

// A function to change go to the profile
const accountProfile = () => {
    // changing the display of the navigation
    document.getElementById('profile-nav').className = 'side-active';
    document.getElementById('transactions-nav').className = 'side-inactive';
    document.getElementById('accounts-nav').className = 'side-inactive';

    //displayng the content
    document.querySelector('.transactions').className = 'transactions hide';
    document.querySelector('.accounts').className = 'accounts hide';
    document.querySelector('.content').className = 'content';
}

// side menu display or hide

document.getElementById('slide-button').addEventListener('click', () => {
    if (reverse) {
        document.querySelector('.main').className = 'main main-alone to-right';
        document.getElementById('side-menu').style.display = 'none';
        reverse = false;
    } else {
        document.querySelector('.main').className = 'main to-right';
        document.getElementById('side-menu').className = 'side-nav to-left';
        document.getElementById('side-menu').style.display = 'inline-block';
        reverse = true;
    }
});

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

// Functions to create the notifications box
const createNotificationsBox = () =>{
    const alert = document.querySelector('.notifications');
    alert.style.display = "inline-block";
    alert.style.opacity = '1';
}

const destroyNotificationsBox = () =>{
    const alert = document.querySelector('.notifications');
    alert.style.opacity = '0';
    setTimeout(() => alert.style.display = "none", 1000);
}
// A function to destroy the overlay
const destroyOverlay = () => {
    document.querySelector('.overlay').className = 'overlay hide';
};

// Displaying the search field
document.querySelector('#search').addEventListener('click', () => {
    //Showing the search field
        document.querySelector('.header-right .hide').className = 'search' ;
        document.querySelector('#search').className = 'hide' ;
});

//creating the alert message on success
const createMessageSucces = () => {
    destroyCreateAccountBox();
    destroyOverlay();
    document.querySelector('.alert .message').innerHTML = 'Account created sucessfully';
    setTimeout(createMessageBox, 600);
    setTimeout(destroyMessageBox, 2000);
};

// Creating an account
document.querySelector('.new-account').addEventListener('click', createAccount);



// Destroying the Create account message box
document.querySelector('.create-account-form .form-body .fa-times')
    .addEventListener('click', destroyCreateAccountBox);

// Switching to the transactions 
document.getElementById('transactions-nav').addEventListener('click', transactions);

// Switching to the account profile 
document.getElementById('profile-nav').addEventListener('click', accountProfile);

// Switching to the accounts list 
document.getElementById('accounts-nav').addEventListener('click', accounts);

//destroying the alert message
document.querySelector('.alert .to-right').addEventListener('click', destroyMessageBox);

// Calling the notifications box the alert message
document.querySelector('#notifications').addEventListener('click', () =>{
    createNotificationsBox();
    setTimeout(destroyNotificationsBox, 2000);

});

// Creating the success message on creation of an account
document.querySelector('.create-account-form').addEventListener('submit', createMessageSucces);


