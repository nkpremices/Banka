// Going to sign in page from the nav

const callSignin = () => { 
    window.location = 'html/signUpIn.html?hide=true';
};

// Going to sign up page from the nav
const callSignup  = () => { 
    window.location = 'html/signUpIn.html';
};

// Going to Home page from the nav
const callHome = () => {
    // changing the display of the navigation
    document.getElementById('home-nav').className = 'li nav-active';
    document.getElementById('signin-nav').className = 'li nav-inactive';
    document.getElementById('signup-nav').className = 'li nav-inactive';
};

//Going to the home page
document.getElementById('home-nav').addEventListener('click', callHome);
document.getElementById('logo').addEventListener('click', callHome);
document.getElementById('home-nav').addEventListener('click', callHome);

//Going to the signin page
document.getElementById('signin-nav').addEventListener('click', callSignin);

//Going to the signUp page
document.getElementById('signup-nav').addEventListener('click', callSignup);
document.getElementById('start').addEventListener('click', callSignup);