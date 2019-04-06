// Going to sign in page from the nav

const callSignin = () => {
    window.location = '../html/signUpIn.html?hide=true';
};

// Going to sign up page from the nav
const callSignup = () => {
    window.location = '../html/signUpIn.html';
};

// a funtion to return back on the home page
const backToHome = () => {
    window.location = '../index.html';
};

// Going to the home page
document.getElementById('home-nav').addEventListener('click', backToHome);
document.getElementById('logo').addEventListener('click', backToHome);
document.getElementById('app-name').addEventListener('click', backToHome);

// Going to the signin page
document.getElementById('signin-nav').addEventListener('click', callSignin);

// Going to the signUp page
document.getElementById('signup-nav').addEventListener('click', callSignup);

const admin = () => {
    window.location = './admin.login.html';
};

const staff = () => {
    window.location = './staff.login.html';
};

// Going to the admin login page in from the navigation
document.getElementById('admin-nav').addEventListener('click', admin);

// Going to the staff login page in from the navigation
document.getElementById('staff-nav').addEventListener('click', staff);
