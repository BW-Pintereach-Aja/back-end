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

router.get('/:userID/user', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getByUser(req.params.userID))
	} catch (error) {
		next(error)
	}
})

router.get('/:categoryID/category', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getByCategory(req.params.categoryID))
	} catch (error) {
		next(error)
	}
})

router.post('/:userID/user', async (req, res, next) => {
	try {
		const article = {
			url: req.body.url,
			title: req.body.title,
			desc: req.body.desc,
			userID: Number(req.params.userID)
		}
		const newArticle = await Articles.addArticle(article)
		// res.status(201).json(newArticle)

		const category = {
			categoryID: Number(req.body.categoryID),
			articleID: Number(newArticle[0])
		}
		const posted = await Articles.addToCategory(category)
		res.status(201).json(posted)
	} catch (error) {
		next(error)
	}
})

module.exports = router
