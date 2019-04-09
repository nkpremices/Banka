import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import environment from '../../configs/environnements';// eslint-disable-line

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);

const accountCreationTemp = {
    accountName: 'scolarship',
    currency: 'usd',
    type: 'curent',
    status: 'active',
};

describe('Accounts', () => {// eslint-disable-line
    describe('POST - /api/v1/accounts', () => {// eslint-disable-line
        before((done) => {// eslint-disable-line
            const user = {
                email: 'premices@gmail.com',
                firstName: 'premices',
                lastName: 'tuverer',
                password: 'dddddd4U',
                type: 'client',
                isAdmin: 'true',
            };
            chai
                .request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                // eslint-disable-next-line no-unused-vars
                .end((err, res) => {
                    done();
                });
        });

        it('it should login test user', (done) => {// eslint-disable-line
            // login and get test user token
            const user1 = {
                email: 'premices@gmail.com',
                password: 'dddddd4U',
            };

            chai
                .request(app)
                .post('/api/v1/auth/signin')
                .send(user1)
                // eslint-disable-next-line no-unused-vars
                .end((err, res) => {
                    done();
                });
        });

        it('it should create an account', (done) => {// eslint-disable-line
            chai
                .request(app)
                .post('/api/v1/accounts')
                .set('token', environment.adminToken)
                .send(accountCreationTemp)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });
});
