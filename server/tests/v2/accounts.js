import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);
// Some variables to initialise tests
const accountCreationTemp = {
    accountName: 'scolarship',
    currency: 'usd',
    type: 'current',
    status: 'draft',
};

describe('Accounts v2', () => {// eslint-disable-line
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
            // login and get test user token
            const user1 = {
                email: 'nzanzu@gmail.com',
                password: 'dddddd4U',
            };

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
                done();
            });
    });
});
