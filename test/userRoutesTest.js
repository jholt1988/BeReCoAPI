const { response } = require('express');
const request = require('supertest');
const app = require('../index');

// Testing GET '/users' endpoint 
describe('GET /users route', function () {
    const data = [
        {
            "username": "TestAdmin123",
            "password": "Jordan",
            "firstName": "Jordan",
            "lastName": "Holt",
            "DOB": "1988-07-11",
            "id": "c337ebff-6cae-4995-9894-1dc15ede9029",
            "createdAt": "2022-02-13T14:27:04.168Z",
            "updatedAt": "2022-02-13T14:27:04.168Z"
        },
        {
            "username": "TestAdmin2",
            "password": "Jordan",
            "firstName": "Jordan",
            "lastName": "Holt",
            "DOB": "1988-07-11",
            "id": "87681d2c-339c-48ba-b703-d743e92939fb",
            "createdAt": "2022-02-07T08:26:34.217Z",
            "updatedAt": "2022-02-07T08:26:34.217Z"
        },
        {
            "username": "JHoltTest",
            "password": "Testpass",
            "firstName": "TestUser123",
            "lastName": "Holt",
            "DOB": "1988-07-11",
            "id": "631fe0a3-af59-4300-99db-f54f2d51331d",
            "createdAt": "2022-02-14T20:57:22.462Z",
            "updatedAt": "2022-02-14T20:57:22.462Z"
        },
        {
            "username": "TestAdmin",
            "password": "Jordan",
            "firstName": "Jordan",
            "lastName": "Holt",
            "DOB": "1988-07-11",
            "id": "37aa9795-0eb0-4c28-a0ec-23903d652ac1",
            "createdAt": "2022-02-06T00:55:11.966Z",
            "updatedAt": "2022-02-14T23:21:01.977Z"
        },
        {
            "username": "BRTest",
            "password": "1111test",
            "firstName": "Bentley",
            "lastName": "Holt",
            "DOB": "1988-07-11",
            "id": "42affd7a-18dd-4c60-8041-f0f1a5d3d9a2",
            "createdAt": "2022-02-17T23:23:07.092Z",
            "updatedAt": "2022-02-17T23:23:07.092Z"
        },
        {
            "username": "criminalTest",
            "password": "minds",
            "firstName": "spencer",
            "lastName": "reid",
            "DOB": "1988-07-11",
            "id": "648ced2e-10e0-45cd-b3fd-6d0aa91e23a4",
            "createdAt": "2022-02-19T20:23:20.332Z",
            "updatedAt": "2022-02-19T20:23:20.332Z"
        },
        {
            "username": "bentbent",
            "password": "password",
            "firstName": "Bentley",
            "lastName": "Holt",
            "DOB": "2019-01-09",
            "id": "f2785438-28bf-44ce-96f5-d213b0bfbb01",
            "createdAt": "2022-02-19T23:25:46.211Z",
            "updatedAt": "2022-02-19T23:25:46.211Z"
        }
    ]
      console.log(it('responds with a json containing a list of all users', async function (done) {
            await request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .expect('content/type', /json/)
                .expect(200,done())
                .then(res => {
                    expect(res.body).to.deep.equal(data)
                    
                }).catch(err => {
                    done(err)
                })
        
          done()
     }))
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
    it('responds with 200 status ',async function (done) {
        await request(app.callback())
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-type', /json/)
            .expect(200, done())
           .done((err => {
                if (err) { return done(err) };
               
            })  
           
            )
    })
})

describe('PUT /users/:id', function (){
    let data = {
        id: "f2785438-28bf-44ce-96f5-d213b0bfbb01",
        username: "testuser",
        password: 'password',
        firstName: "test",

        DOB: '07/11/1988'

    }
    it('responds with 200', async function (done) {
        await request(app)
        .put(`/users/${data.id}`)
            .send({ password: 'pass' })
             .set('Accept', 'application/json')
             .set('req.params.id', data.id)
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                expect(data.password).to.equal('pa')
                expect(res.body).to.equal(1)
            }, done())
            .catch((err) => {
                if(err){return done(err)}
            })
         
   }

)})
