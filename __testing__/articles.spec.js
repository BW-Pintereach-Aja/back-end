const supertest = require('supertest')
const server = require('../index')
const db = require('../database/config')

beforeAll(async () => {})

afterAll(async () => {
	await db.destroy()
})

describe('GET /', () => {
	it('GET / (Unauthorized) throws a 401', async () => {
		const res = await supertest(server).get('/api/articles')
		expect(res.statusCode).toBe(401)
	})

	it('GET / (Unauthorized) returns message', async () => {
		const res = await supertest(server).get('/api/articles')
		expect(res.body).toEqual({ message: 'Invalid Credentials' })
	})

	it('GET / (Authorized)', async () => {})
})
