import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import initializeDb from '../../middlewares/initialize.db';
import environment from '../../configs/environnements';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);

// A user to enable tests
const user = {
    email: 'yvettekal@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo',
    password: 'R72kal20',
    type: 'client',
    isAdmin: false,
};

const staffAdminUser = {
    email: 'primo4@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo',
    password: 'R72kal20',
    type: 'staff',
    isAdmin: true,
};

const staffAdminUser1 = {
    email: 'primo45@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo',
    password: 'R72kal20',
    type: 'staff',
    isAdmin: true,
};

const staffAdminUser2 = {
    email: 'primo45@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo',
    password: 'R72kal20',
    type: 'staff',
    isAdmin: true,
};

// Testing the signup
describe('Signup v2', () => {// eslint-disable-line
    before((done) => {// eslint-disable-line
        initializeDb.dropTables().then(() => {
            initializeDb.createTables().then(() => {
                const admin = {
                    email: 'admin@gmail.com',
                    password: 'passWord1',
                };
                chai
                    .request(app)
                    .post('/api/v2/auth/signin')
                    .send(admin)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('Object');
                        done();
                    });
            });
        });
    });
    it('it should create a new user account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v2/auth/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('token');
                res.body.data.should.have.property('id')
                    .which.is.a('number');
                res.body.data.should.have.property('firstName', 'Yvette');
                res.body.data.should.have.property('lastName', 'kalimumbalo');
                res.body
                    .data.should.have.property('email', 'yvettekal@gmail.com');
                done();
            });
    });

    it('it should return an error message when the email is entered two times', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v2/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.should.be.an('object');
                    res.body.data.should.have
                        .property('error', 'Email address already in use');
                    done();
                });
        });
        it('it should create a staff/admin account when requested by the admin', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v2/auth/signup')
                .set('token', `${environment.admin.token}`)
                .send(staffAdminUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.an('object');
                    done();
                });
        });

        it('it should not create a staff/admin account when a token is not provided', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v2/auth/signup')
                .send(staffAdminUser1)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.should.be.an('object');
                    done();
                });
        });

        it('it should not create a staff/admin account when an invalid token is provided', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v2/auth/signup')
                .set('token', '124dsdg')
                .send(staffAdminUser2)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.should.be.an('object');
                    done();
                });
        });
});

describe('Signin v2', () => {// eslint-disable-line
    it('it should login an existing user with valid credentials', (done) => {// eslint-disable-line
        const user2 = {
            email: 'yvettekal@gmail.com',
            password: 'R72kal20',
        };

        chai
            .request(app)
            .post('/api/v2/auth/signin')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('object');
                res.body.data.should.have.property('token');
                res.body.data.should.have.property('id')
                    .which.is.a('number');
                res.body.data.should.have.property('firstName', 'Yvette');
                res.body.data.should.have.property('lastName', 'kalimumbalo');
                res.body
                    .data.should.have.property('email', 'yvettekal@gmail.com');
                done();
            });
    });

    it('it should not login a user with invalid email', (done) => {// eslint-disable-line
        const user3 = {
            email: 'yvettekannl@gmail.com',
            password: 'R72kal20',
        };
        chai
            .request(app)
            .post('/api/v2/auth/signin')
            .send(user3)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('data')
                    .which.have
                    .property('error', 'A user with that email doesn\'t exist');
                done();
            });
    });

    it('it should not login with invalid password', (done) => {// eslint-disable-line
        const user3 = {
            email: 'yvettekal@gmail.com',
            password: 'R72kaxl20',
        };


        chai
            .request(app)
            .post('/api/v2/auth/signin')
            .send(user3)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
