import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import environment from '../../configs/environnements';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);
// Some variables to initialise tests
const accountCreationTemp = {
    accountName: 'fellowship',
    currency: 'usd',
    type: 'current',
};

const accountCreationTemp1 = {
    accountName: 'fellowship1',
    currency: 'usd',
    type: 'current',
};

const accountCreationTemp2 = {
    accountName: 'fellowship2',
    currency: 'usd',
    type: 'current',
};
// test user token
const user1 = {
    email: 'nzanzu@gmail.com',
    password: 'dddddd4U',
};

let AccountNumber;
let AccountNumber2;

describe('Accounts v2', () => {// eslint-disable-line
    let userToken;

    before((done) => {// eslint-disable-line
        // Test users
        const user = {
            email: 'nzanzu@gmail.com',
            firstName: 'premices',
            lastName: 'tuverer',
            password: 'dddddd4U',
        };
        chai
            .request(app)
            .post('/api/v2/auth/signup')
            .send(user)
            // eslint-disable-next-line no-unused-vars
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('it should login test user to create an account',// eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v2/auth/signin')
                .send(user1)
                .end((err, res) => {
                    res.should.have.status(200);
                    userToken = res.body.data.token;
                    done();
                });
        });

    it('it should create an account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v2/accounts')
            .set('token', userToken)
            .send(accountCreationTemp)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('firstName', 'premices');
                res.body.data.should.have.property('lastName', 'tuverer');
                res.body.data.should.have.property('email', 'nzanzu@gmail.com');
                res.body.data.should.have.property('type', 'current');
                res.body.data.should.have.property('openingBalance', 0);
                AccountNumber = res.body.data.accountNumber;
                done();
            });
    });
    it('It should login the admin', (done) => {// eslint-disable-line
        const admin = {
            email: `${environment.admin.email}`,
            password: `${environment.admin.password}`,
        };
        chai
            .request(app)
            .post('/api/v2/auth/signin')
            .send(admin)
            // eslint-disable-next-line no-unused-vars
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('it should change the status of the created account', (done) => {// eslint-disable-line
        const accountStatusObj = {
            status: 'active',
        };

        chai
            .request(app)
            .patch(`/api/v2/accounts/${AccountNumber}`)
            .set('token', `${environment.admin.token}`)
            .send(accountStatusObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have
                    .property('status', accountStatusObj.status);
                done();
            });
    });
    it('it shouldn\'t change the status with strings in the account number', (done) => {// eslint-disable-line
        const accountStatusObj = {
            status: 'active',
        };

        chai
            .request(app)
            .patch(`/api/v2/accounts/${AccountNumber}fff`)
            .set('token', `${environment.admin.token}`)
            .send(accountStatusObj)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.data.should.be.a('object');
                res.body.data.should.have
                    .property('error', 'Invalid account number provided');
                done();
            });
    });
    it('it should get all accounts owned by a specific user', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get(`/api/v2/user/${user1.email}/accounts`)
            .set('token', `${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                res.body.data.should.have
                    .property('length', 1);
                done();
            });
    });
    it('it should create an account for the second user', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v2/accounts')
            .set('token', environment.user.token)
            .send(accountCreationTemp2)
            .end((err, res) => {
                res.should.have.status(201);
                AccountNumber2 = res.body.data.accountNumber;
                done();
            });
    });
    it('it should  activate the second account', (done) => {// eslint-disable-line
        const accountStatusObj = {
            status: 'active',
        };

        chai
            .request(app)
            .patch(`/api/v2/accounts/${AccountNumber2}`)
            .set('token', `${environment.admin.token}`)
            .send(accountStatusObj)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should get a specific bank account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get(`/api/v2/accounts/${AccountNumber}`)
            .set('token', `${userToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('object');
                res.body.data.should.have
                    .property('accountNumber', AccountNumber);
                done();
            });
    });
    it('it should\'t get a specific bank account with anothe user\'s account number', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get(`/api/v2/accounts/${AccountNumber2}`)
            .set('token', `${userToken}`)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.data.should.be.an('object');
                res.body.data.should.have
                    .property('error', 'A user can view only his '
                    + 'own acccounts');
                done();
            });
    });
    it('it should\'t get an account whith characters in the account number', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get(`/api/v2/accounts/${AccountNumber}fffff`)
            .set('token', `${userToken}`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.data.should.be.an('object');
                res.body.data.should.have
                    .property('error', 'Invalid account number provided');
                done();
            });
    });
    it('it should get all bank accounts', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get('/api/v2/accounts/')
            .set('token', `${environment.admin.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                done();
            });
    });
    it('it should create another account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v2/accounts')
            .set('token', userToken)
            .send(accountCreationTemp1)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('firstName', 'premices');
                res.body.data.should.have.property('lastName', 'tuverer');
                res.body.data.should.have.property('email', 'nzanzu@gmail.com');
                res.body.data.should.have.property('type', 'current');
                res.body.data.should.have.property('openingBalance', 0);
                AccountNumber = res.body.data.accountNumber;
                done();
            });
    });
    it('it should get all active bank accounts', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get('/api/v2/accounts/?status=active')
            .set('token', `${environment.admin.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                res.body.data.should.have
                    .property('length', 3);
                done();
            });
    });
    it('it should change the status of an account to dormant', (done) => {// eslint-disable-line
        const accountStatusObj = {
            status: 'dormant',
        };

        chai
            .request(app)
            .patch(`/api/v2/accounts/${AccountNumber}`)
            .set('token', `${environment.admin.token}`)
            .send(accountStatusObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have
                    .property('status', accountStatusObj.status);
                done();
            });
    });
    it('it should get all dormant bank accounts', (done) => {// eslint-disable-line
        chai
            .request(app)
            .get('/api/v2/accounts/?status=dormant')
            .set('token', `${environment.admin.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.an('array');
                res.body.data.should.have
                    .property('length', 1);
                done();
            });
    });

    it('it should delete an account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .delete(`/api/v2/accounts/${AccountNumber}`)
            .set('token', `${environment.admin.token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have
                    .property('message', 'Account successfully deleted');
                done();
            });
    });
});
