import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import initializeDb from '../../middlewares/initialize.db';

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

// Testing the signup
describe('Signup v2', () => {// eslint-disable-line
    before((done) => {// eslint-disable-line
        initializeDb.dropTables().then(() => {
            initializeDb.createTables().then(() => {
                done();
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
});
