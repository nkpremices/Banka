import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import environment from '../../configs/environnements';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);
// Some variables to initialise tests
const accountCreationTemp = {
    accountName: 'scolarship',
    currency: 'usd',
    type: 'current',
};


const cashier = {
    email: 'cashier@gmail.com',
    firstName: 'cashier',
    lastName: 'lastname',
    password: 'passWord4U',
    type: 'staff',
    isAdmin: 'false',
};

let AccountNumber;
let cashierToken;
let cashierId;

describe('Transactions', () => {// eslint-disable-line

    let userToken;

    before((done) => {// eslint-disable-line
        const user = {
            email: 'user@gmail.com',
            firstName: 'premices',
            lastName: 'tuverer',
            password: 'dddddd4U',
        };
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send(user)
            // eslint-disable-next-line no-unused-vars
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('it should login test user to create an account',// eslint-disable-line
        (done) => {
            // login and get test user token
            const liginUser = {
                email: 'user@gmail.com',
                password: 'dddddd4U',
            };

            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send(liginUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    userToken = res.body.data.token;
                    done();
                });
        });

    it('it should signup a cashier', (done) => {// eslint-disable-line
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .set('authorization', `Bearer ${environment.admin.token}`)
            .send(cashier)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.data.should.be.a('object');
                done();
            });
    });
    it('it should signin a cashier', (done) => {// eslint-disable-line
        const cahshierLoginOb = {
            email: 'cashier@gmail.com',
            password: 'passWord4U',
        };

        chai
            .request(app)
            .post('/api/v1/auth/signin')
            .send(cahshierLoginOb)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                cashierToken = res.body.data.token;
                cashierId = res.body.data.id;
                done();
            });
    });
    it('it should create an account so that a cashier can credit it',// eslint-disable-line
        (done) => {
            chai
                .request(app)
                .post('/api/v1/accounts')
                .set('authorization', `Bearer ${userToken}`)
                .send(accountCreationTemp)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.data.should.be.a('object');
                    AccountNumber = res.body.data.accountNumber;
                    done();
                });
        });
        it('it should change the status of the created account', (done) => {// eslint-disable-line
        const accountStatusObj = {
            status: 'active',
        };

        chai
            .request(app)
            .patch(`/api/v1/accounts/${AccountNumber}`)
            .set('authorization', `Bearer ${environment.admin.token}`)
            .send(accountStatusObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have
                    .property('status', accountStatusObj.status);
                done();
            });
    });
    it('it should credit the created account', (done) => {// eslint-disable-line
        const credit = {
            amount: 2500,
        };

        chai
            .request(app)
            .post(`/api/v1/transactions/${AccountNumber}/credit`)
            .set('authorization', `Bearer ${cashierToken}`)
            .send(credit)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('transactionId', 1);
                res.body.data.should.have
                    .property('accountNumber', AccountNumber);
                res.body.data.should.have.property('amount', 2500);
                res.body.data.should.have.property('cashier', cashierId);
                res.body.data.should.have.property('transactionType', 'credit');
                res.body.data.should.have.property('accountBalance', 2500);
                done();
            });
    });
    it('it should debit the created account', (done) => {// eslint-disable-line
        const debit = {
            amount: 2000,
        };

        chai
            .request(app)
            .post(`/api/v1/transactions/${AccountNumber}/debit`)
            .set('authorization', `Bearer ${cashierToken}`)
            .send(debit)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('transactionId', 2);
                res.body.data.should.have
                    .property('accountNumber', AccountNumber);
                res.body.data.should.have.property('amount', 2000);
                res.body.data.should.have.property('cashier', cashierId);
                res.body.data.should.have.property('transactionType', 'debit');
                res.body.data.should.have.property('accountBalance', 500);
                done();
            });
    });

    it('it should not debit with an invalid account number', (done) => {// eslint-disable-line
        const debit = {
            amount: 2000,
        };

        chai
            .request(app)
            .post(`/api/v1/transactions/${AccountNumber}j/debit`)
            .set('authorization', `Bearer ${cashierToken}`)
            .send(debit)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
