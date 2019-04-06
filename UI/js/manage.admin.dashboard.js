/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */

/* Fetching the list of all activate
     and deactivate or delete buttons */
const activateButtons = document.getElementsByClassName('action-1');
const deactivateButtons = document.getElementsByClassName('action-2');
const deleteButtons = document.getElementsByClassName('action-3');

// Displaying the search field
document.querySelector('.profile-header #search')
    .addEventListener('click', () => {
    // Showing the search field
        document.querySelector('.profile-header .hide').className = 'search';
        document.querySelector('.profile-header #search').className = 'hide';
    });

// Functions to activate and deactivate  or to delete

for (e of activateButtons) {
    e.addEventListener('click', () => {
        event.target.parentNode.parentNode
            .childNodes[6].childNodes[7].childNodes[1].innerText = 'Active';
        alertMessage('Account activated');
    });
}

for (e of deactivateButtons) {
    e.addEventListener('click', () => {
        event.target.parentNode.parentNode.childNodes[6]
            .childNodes[7].childNodes[1].innerText = 'Inactive';
        alertMessage('Account deactivated');
    });
}

for (e of deleteButtons) {
    e.addEventListener('click', () => {
        event.target.parentNode.parentNode.parentNode
            .className = 'account-profile-content to-right hide';
        alertMessage('Account deleted');
    });
}
