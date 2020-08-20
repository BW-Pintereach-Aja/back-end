const router = require('express').Router()
const Users = require('../models/users-model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validation, validateUser, restrict, stats } = require('../middleware/index')

// init router
router.get('/', async (req, res, next) => {
	try {
		res.status(200).json({ message: 'Users router works' })
	} catch (error) {
		next(error)
	}
})

//get users
router.get('/users', async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch (err) {
		next(err)
	}
})

//get users by id
router.get('/users/:id', validateUser, (req, res, next) => {
	try {
		res.json(req.user)
		const { user } = req.session
		if (user.id !== Number(req.params.id))
			return res.status(401).json({ message: 'You are unable to access this resource.' })
		next()
	} catch (err) {
		next(err)
	}
})

//register user
router.post('/register', async (req, res, next) => {
	try {
		const { firstname, lastname, username, password } = req.body
		const user = await Users.findBy({ username }).first()
		if (user) {
			return res.status(409).json({
				message: 'User already taken'
			})
		}
		const newUser = await Users.add({
			firstname,
			lastname,
			username,
			password: await bcrypt.hash(password, 10)
		})

		res.status(201).json(await Users.findById(newUser[0]))
	} catch (err) {
		next(err)
	}
})

//login
router.post('/login', validation, async (req, res, next) => {
	try {
		const { firstname, lastname, username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (!user) {
			return res.status(400).json({
				message: 'Invalid Credentials'
			})
		}
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(400).json({
				message: 'Invalid Credentials'
			})
		}
		const payload = {
			userId: user.id,
			firstname: user.firstname,
			lastname: user.lastname,
			username: user.username
		}
		res.cookie('token', jwt.sign(payload, process.env.JWT_SECRET || 'secretiveness'))
		const token = jwt.sign(payload, process.env.JWT_SECRET || 'secretiveness')
		res.json({
			message: `Welcome ${user.username}!`,
			token: token
		})
	} catch (err) {
		next(err)
	}
})

//ogout
router.get('/logout', async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router
