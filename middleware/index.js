const db = require('../database/config')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users-model')
const Users = require('../models/users-model')
const Articles = require('../models/articles-model')

//status code function-middleware
const stats = (code, msg) => {
	return res.status(code).json({
		message: msg
	})
}

// validation
function validation(stats, req, res, next) {
	if (req.body && req.body.username && req.body.password) {
		next()
	} else {
		// stats(400, "Username or Password not entered")
		res.status(400).json({ message: 'Username or password not entered' })
	}
}

//validateUser
const validateUser = async (stats, req, res, next) => {
	try {
		const validUser = await Users.findBy({ id: req.params.id })
		if (!validUser) {
			return stats(404, 'User does not exist')
		}
		req.user = validUser
		next()
	} catch (err) {
		next(err)
	}
}

function restrict() {
	return async (req, res, next) => {
		try {
			const authErr = { message: 'Invalid Credentials' }
			const token = req.cookies.token || req.headers.authorization

			if (!token) {
				// return stats(401, 'Invalid Credentials 1')
				return res.status(401).json(authErr)
			}
			jwt.verify(token, process.env.JWT_SECRET || 'secretiveness', (err, decoded) => {
				if (err) {
					// return stats(401, 'Invalid Credentials 2')
					return res.status(401).json(authErr)
				}
				next()
			})
		} catch (err) {
			next(err)
		}
	}
}

async function articleExists(req, res, next) {
	const article = await Articles.getArticleById(req.params.id)
	console.log(article)
	if (article.length === 0) {
		return res.status(404).json({
			message: 'Article by that ID does not exist. Request terminated'
		})
	} else {
		next()
	}
}

async function categoryExists(req, res, next) {
	const category = await Articles.findCategory(req.body.name).first()
	if (category) {
		return res.status(409).json({ message: 'Category exists. Request terminated.' })
	}
	next()
}

function inputValid(req, res, next) {
	// console.log(req.body);
	try {
		if (!req.body) {
			return res.status(401).json({ message: 'Valid input is required' })
		}
		body = req.body
		next()
	} catch (error) {
		next(error)
	}
}

module.exports = {
	validation,
	validateUser,
	restrict,
	stats,
	articleExists,
	categoryExists,
	inputValid
}
