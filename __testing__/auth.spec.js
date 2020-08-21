const request = require('supertest');
const server = require('../index');
const { expectCt } = require('helmet');

//jest working?
it('jest test', ()=>{
    expect(1).toBe(1)
})

describe('Auth endpoints', () =>{
    describe('get/', ()=>{
        let res = {};
        beforeAll(async() =>{
            res = await request(server).get('/')
        });
    // it('Should return status code 200')
    })
})