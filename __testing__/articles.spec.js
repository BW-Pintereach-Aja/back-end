const supertest = require('supertest')
const server = require('../index')

describe('Testing Environment', () => {
	it("The environment should be 'testing'", async () => {
		expect(process.env.NODE_ENV).toBe('testing')
	})
})

describe('', () => {
	it('GET / (Unauthorized)', async () => {
		const res = await supertest(server).get('/api/articles')
		expect(res.statusCode).toBe(401)
	})

	it('GET / (Authorized)', async () => {})
})
