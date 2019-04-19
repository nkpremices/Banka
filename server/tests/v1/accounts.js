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
    status: 'draft',
};

let AccountNumber;

describe('Accounts', () => {// eslint-disable-line
    let userToken;

    before((done) => {// eslint-disable-line
        const user = {
            email: 'nzanzu@gmail.com',
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
            const user1 = {
                email: 'nzanzu@gmail.com',
                password: 'dddddd4U',
            };

            chai
                .request(app)
                .post('/api/v1/auth/signin')
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
            .post('/api/v1/accounts')
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
            .post('/api/v1/auth/signin')
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
            .patch(`/api/v1/accounts/${AccountNumber}`)
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

    it('it should delete an account', (done) => {// eslint-disable-line
        chai
            .request(app)
            .delete(`/api/v1/accounts/${AccountNumber}`)
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
