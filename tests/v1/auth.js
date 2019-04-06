import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

const should = chai.should();// eslint-disable-line

chai.use(chaiHttp);

describe('home', () => {// eslint-disable-line
    it('should return an object', (done) => { // eslint-disable-line
        chai.request(app)// eslint-disable-line
            .post('/')
            .end((err, res) => {
                res.body.should.be.an('Object')
                    .which.have.property('data').which.is.an('Object')
                    .which.have.property('message').which.is.a('String');
                done();
            });
    });
});
