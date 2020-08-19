const router = require('express').Router()
const Articles = require('../models/articles-model')

router.get('/', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getArticles())
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getArticleById(req.params.id))
	} catch (error) {
		next(error)
	}
})

router.get('/:id/user', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getByUser(req.params.id))
	} catch (error) {
		next(error)
	}
})

router.get('/:id/category', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getByCategory(req.params.id))
	} catch (error) {
		next(error)
	}
})

module.exports = router
