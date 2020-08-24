const supertest = require('supertest')
const server = require('../index')
const db = require('../database/config')
const { set } = require('../index')

beforeAll(async () => {
	await db.seed.run()
})

afterAll(async () => {
	await db.destroy()
})

describe('GET requests', () => {
	it('GET / (Unauthorized)', async () => {
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

	it('GET /api/articles/:id should return an article object', async () => {
		const res = await supertest(server).get('/api/articles/1').set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body[0].articleID).toBe(1)
		expect(res.body[0].user).toBe('tiff')
		expect(res.body[0].title).toBe('CSS Something')
	})

	it('GET /api/articles/categories', async () => {
		const res = await supertest(server)
			.get('/api/articles/categories')
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body.length).toBe(3)
	})

	it('GET /api/articles/:id/user', async () => {
		const res = await supertest(server).get('/api/articles/1/user').set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body.length).toBe(2)
		expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
	})

	it('GET /api/articles/:id/category', async () => {
		const res = await supertest(server)
			.get('/api/articles/3/category')
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(200)
		expect(res.body.length).toBe(1)
	})

	it('GET /api/articles/:id/category (Does not exist)', async () => {
		const res = await supertest(server)
			.get('/api/articles/335342/category')
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(404)
	})
})

describe('POST requests', () => {
	it('POST new article', async () => {
		const res = await supertest(server)
			.post('/api/articles/1/user')
			.send({
				url: 'yirano.dev',
				title: 'Portfolio',
				desc: 'My portfolio',
				categoryID: 1
			})
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(201)
		expect(res.body).toEqual([ 6 ])
	})

	it('POST new article -- MISSING input field', async () => {
		const res = await supertest(server)
			.post('/api/articles/1/user')
			.send({
				url: 'empty.dev',
				title: '',
				desc: 'Forgot the TITLE',
				categoryID: 1
			})
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(res.statusCode).toBe(400)
	})

	it('POST new category', async () => {
		const res = await supertest(server)
			.post('/api/articles/new-category')
			.send({
				name: 'New Category',
				desc: 'This is a new category'
			})
			.set({ Authorization: process.env.TEST_TOKEN })

		expect(res.statusCode).toBe(201)
		expect(res.body).toEqual([ 4 ])

		const newCount = await supertest(server)
			.get('/api/articles/categories')
			.set({ Authorization: process.env.TEST_TOKEN })
		expect(newCount.body.length).toBe(4)
		expect(newCount.body[3].name).toBe('New Category')
	})
})

describe('PUT requests', () => {
	it('PUT edits an article', async () => {
		await supertest(server).put('/api/articles/4').set({ Authorization: process.env.TEST_TOKEN }).send({
			url: 'aQueen.dev',
			title: 'Portfolio',
			desc: 'My portfolio',
			categoryID: 1
		})

		const edited = await supertest(server).get('/api/articles/4').set({ Authorization: process.env.TEST_TOKEN })

		expect(edited.body[0].url).toBe('aQueen.dev')
	})

	it('PUT trying to send an empty value will throw error', async () => {
		const res = await supertest(server).put('/api/articles/4').set({ Authorization: process.env.TEST_TOKEN }).send({
			url: 'aQueen.dev',
			title: '',
			desc: 'My portfolio',
			categoryID: 1
		})
		expect(res.statusCode).toBe(400)
	})
})

describe('DELETE requests', () => {
	it('DELETE an article', async () => {
		const res = await supertest(server)
			.delete('/api/articles/1/remove-article')
			.set({ Authorization: process.env.TEST_TOKEN })

		expect(res.statusCode).toBe(200)

		const count = await supertest(server).get('/api/articles').set({ Authorization: process.env.TEST_TOKEN })
		expect(count.body.length).toBe(5)
	})

	it('DELETE should throw 404', async () => {
		const res = await supertest(server)
			.delete('/api/articles/1345346346346/remove-article')
			.set({ Authorization: process.env.TEST_TOKEN })

		expect(res.statusCode).toBe(404)
	})

	it('DELETE a category', async () => {
		await supertest(server).delete('/api/articles/1/remove-category').set({ Authorization: process.env.TEST_TOKEN })

		const res = await supertest(server).get('/api/articles').set({ Authorization: process.env.TEST_TOKEN })

		expect(res.body.length).toBe(1)
	})
})
