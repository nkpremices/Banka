import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);

// A user to enable tests
const user = {
    email: 'yvettekal@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo',
    password: 'R72kal20',
    type: 'client',
    isAdmin: true,
};

// A user to enable validation tests
const user1 = {
    email: 'yvettekal@gmail.com',
    firstName: 'Yvette',
    lastName: 'kalimumbalo ',
    password: 'R72kal20',
    type: 'client',
    isAdmin: true,
};

// Testing the base url
describe('home', () => {// eslint-disable-line
    it('should return an object', (done) => { // eslint-disable-line
        chai.request(app)// eslint-disable-line
            .get('/')
            .end((err, res) => {
                res.body.should.be.an('Object')
                    .which.have.property('data').which.is.an('Object')
                    .which.have.property('message').which.is.a('String');
                done();
            });
    });
});

// Testing the authentication endpoints

// Testing the signup
describe('POST - /api/v1/auth/signup', () => {// eslint-disable-line
    it('it should create a new user account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(user)
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

    it('it should return an error message when the email is entered two times', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.data.should.be.an('object');
                    res.body.data.should.have
                        .property('error', 'Email address already in use');
                    done();
                });
        });
    it('it should return an error message when one of the fields is not writen good', // eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.error.should.be.an('object');
                    res.body.error.should.have
                        .property('message', 'lastName must only'
                        + ' contain alpha-numeric characters');
                    done();
                });
        });
});

describe('POST - /api/v1/auth/signin', () => {// eslint-disable-line
    it('it should login an existing user with valid credentials', (done) => {// eslint-disable-line
        const user2 = {
            email: 'yvettekal@gmail.com',
            password: 'R72kal20',
        };

        chai
            .request(app)
            .post('/api/v1/auth/signin')
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

    it('it should not login with invalid email', (done) => {// eslint-disable-line
        const user3 = {
            email: 'yvettekannl@gmail.com',
            password: 'R72kal20',
        };
        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(user3)
            .end((err, res) => {
                res.should.have.status(400);
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
            .post('/api/v1/auth/signin')
            .send(user3)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
