const supertest = require('supertest')
const server = require('../index')
const db = require('../database/config')

beforeAll(async () => {})

beforeEach(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

describe('GET /', () => {
	it('GET / (Unauthorized) throws a 401', async () => {
		const res = await supertest(server).get('/api/articles')
		expect(res.statusCode).toBe(401)
		expect(res.body).toEqual({ message: 'Invalid Credentials' })
	})

	it('GET / (Unauthorized) returns message', async () => {
		const res = await supertest(server).get('/api/articles')
		expect(res.body).toEqual({ message: 'Invalid Credentials' })
	})

	it('GET / (Authorized) w/Cookie', async () => {
		const res = await supertest(server).get('/api/articles').set('Cookie', `token=${process.env.TEST_TOKEN}`)
		expect(res.statusCode).toBe(200)
		expect(res.body.length).toBe(5)
		expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
	})

	it('GET / (Authorized) w/Header', async () => {
		const res = await supertest(server).get('/api/articles').set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body.length).toBe(5)
		expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
	})

	it('GET /:id should return an article object', async () => {
		const res = await supertest(server).get('/api/articles/1').set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body[0].articleID).toBe(1)
		expect(res.body[0].user).toBe('tiff')
		expect(res.body[0].title).toBe('CSS Something')
	})
})
