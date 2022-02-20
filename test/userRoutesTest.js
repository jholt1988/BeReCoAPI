const request = require('supertest');
const app = require('../index');

//Testing GET '/users' endpoint 
    describe('GET /users route', function() {
        it('responds with a json containing a list of all users', function (done) {
            request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .expect('content/type', /json/)
                .expect(200, done())
                
        })
    })

//Testing POST '/users' endpoint 
describe('POST /users route', function () {
    let data = {
        username: "testuser",
        password: 'password',
        firstName: "test",
        lastName: "testLastName",
        DOB: '07/11/1988'

    }
    it('responds with 200 status ', function (done) {
        request(app)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done())
            .end((err => {
                if (err) { return done(err) };
               
            })      
        )
    
    })
})