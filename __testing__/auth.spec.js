const request = require('supertest');
const server = require('../index');
const { expectCt } = require('helmet');

//jest working?
it('jest test', ()=>{
    expect(1).toBe(1)
})

//auth endpoints 
describe('Auth endpoints', () =>{
    describe('get/', ()=>{
        let res = {};
        beforeAll(async() =>{
            res = await request(server).get('/')
        });
    it('Should return status code 200', async () =>{
            expect(res.status).toBe(200)
    })
    it('Should return message', ()=>{
        expect(res.body)
        .toEqual({ message: "API is up and running..."})
    })
    it('Should have application/json content type', () =>{
        request(server)
        .get('/')
        .expect('Content-Type', 'application/json')
    })
    })
})