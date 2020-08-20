const router = require('express').Router()
const Users = require('../models/users-model')

const bcrypt = require('bcrypt.js')
const jwt = require('jsonwebtoken')

const { validation, restrict, stats } = require('../middleware/index')

// router.get('/', async (req, res, next) => {
// 	try {
// 		res.status(200).json({ message: 'Users router works' })
// 	} catch (error) {
// 		next(error)
// 	}
// })

router.get('/', restrict, async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch (err) {
		next(err)
	}
})

router.post('/register', validation, async (stats, req, res, next) => {
	try {
		const { firstname, lastname, username, password } = req.body
		const user = await Users.findBy({ username }).first()
		if (user) {
			stats(409, 'Username already taken ')
		}
		const newUser = await Users.add({
			firstname,
			lastname,
			username,
			password: await bcrypt.hash(password, 15)
		})
		stats(201, newUser)
	} catch (err) {
		next(err)
	}
})

module.exports = router
