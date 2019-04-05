// Fetching the list of all activate and deactivate buttons
const activateButtons = document.getElementsByClassName('action-1');
const deactivateButtons = document.getElementsByClassName('action-2');

// Displaying the search field
document.querySelector('.profile-header #search').addEventListener('click', () => {
    //Showing the search field
    document.querySelector('.profile-header .hide').className = 'search';
    document.querySelector('.profile-header #search').className = 'hide';
});

// Functions to activate and deactivate 

for (e of activateButtons){
    e.addEventListener('click',() => {
        event.target.parentNode.parentNode.childNodes[6].childNodes[7].childNodes[1].innerText='Active';
        alertMessage('Account activated');
    });
};

for (e of deactivateButtons){
    e.addEventListener('click',() => {
        event.target.parentNode.parentNode.childNodes[6].childNodes[7].childNodes[1].innerText='Inactive';
        alertMessage('Account deactivated');
    });
};
