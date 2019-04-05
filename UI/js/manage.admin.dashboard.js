// Displaying the search field
document.querySelector('.profile-header #search').addEventListener('click', () => {
    //Showing the search field
    document.querySelector('.profile-header .hide').className = 'search';
    document.querySelector('.profile-header #search').className = 'hide';
});
