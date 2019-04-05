// Fetching the list of all credit or debit buttons 
const creditButtons = document.getElementsByClassName('action-s1');
const debitButtons = document.getElementsByClassName('action-s2');

// Function to credit an account

for (e of creditButtons){
    e.addEventListener('click',() => {
        document.querySelector('.overlay').className = 'overlay';
        document.querySelector('.form').className = 'form to-right';
        document.querySelector('.credit-debit-account-form').className = 'credit-debit-account-form';
    });
};

for (e of debitButtons){
    e.addEventListener('click',() => {
        document.querySelector('.overlay').className = 'overlay';
        document.querySelector('.form').className = 'form to-right';
        document.querySelector('.credit-debit-account-form').className = 'credit-debit-account-form';
    });
};

// A funtion to destroy the reset password form 
const destoyCreditAccount = () => {
    document.querySelector('#credit-debit-account').className = 'form to-right hide';
    destroyOverlay();
}
// Dislaying a success message after submission on the reset password form
document.querySelector('.credit-debit-account-form').addEventListener('submit', () => {
    destoyCreditAccount();
    alertMessage('Credit/Debit operation successfull');
});

// Destroying the credit account box
document.querySelector('.credit-debit-account-form .form-body .fa-times')
    .addEventListener('click', destoyCreditAccount);

