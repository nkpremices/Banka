// a funtion to return back on the home page
const backToHome = () => {
    window.location = '../index.html';
};

// Going to the home page
document.getElementById('logo').addEventListener('click', backToHome);
document.getElementById('app-name').addEventListener('click', backToHome);

document.querySelector('#search').addEventListener('click', () => {
    //Showing the search field
        document.querySelector('.header-right .hide').className = 'search' ;
        document.querySelector('#search').className = 'hide' ;
})