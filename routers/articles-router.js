const router = require('express').Router()
const Articles = require('../models/articles-model')
const { validateForm } = require('../middleware/index')

// get a list of existing categories
router.get('/categories', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getCategories())
		// res.status(200).json({ message: 'HELLO' })
	} catch (error) {
		next(error)
	}
})

// get all articles
router.get('/', async (req, res, next) => {
	try {
		res.json(await Articles.getArticles())
	} catch (error) {
		next(error)
	}
})

// get article by articleID
router.get('/:id', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getArticleById(req.params.id))
	} catch (error) {
		next(error)
	}
})

// get all articles from a user
router.get('/:userID/user', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.getByUser(req.params.userID))
	} catch (error) {
		next(error)
	}
})

// get all articles from a category
router.get('/:id/category', async (req, res, next) => {
	try {
		const found = await Articles.getByCategory(req.params.id)
		if (found.length === 0) {
			return res.status(404).json({ message: 'Category by that ID does not exist.' })
		}
		res.status(200).json(found)
	} catch (error) {
		next(error)
	}
})

// save new article
router.post('/:userID/user', validateForm, async (req, res, next) => {
	try {
		const article = {
			url: req.body.url,
			title: req.body.title,
			desc: req.body.desc,
			userID: Number(req.params.userID)
		}
		const newArticle = await Articles.addArticle(article)

		const category = {
			categoryID: req.body.categoryID,
			articleID: newArticle[0]
		}

		await Articles.addToCategory(category)

		res.status(201).json({ message: 'Your post has been posted.' })
	} catch (error) {
		next(error)
	}
})

// create new category
router.post('/new-category', validateForm, async (req, res, next) => {
	try {
		const exists = await Articles.findCategory(req.body.name).first()
		if (exists) {
			return res.status(409).json({ message: 'Category already exists' })
		}
		await Articles.addCategory(req.body)
		res.status(201).json({ message: 'New category added' })
	} catch (error) {
		next(error)
	}
})

// edit an article
router.put('/:articleID', validateForm, async (req, res, next) => {
	try {
		const article = {
			url: req.body.url,
			title: req.body.title,
			desc: req.body.desc
		}

		await Articles.editArticle(article, req.params.articleID)

		const category = {
			categoryID: req.body.categoryID,
			articleID: req.params.articleID
		}

		await Articles.updateCategory(category, Number(req.params.articleID))

		res.status(201).json({ message: 'Article Updated' })
	} catch (error) {
		console.dir(error)
		next(error)
	}
})

// edit a category
router.put('/:categoryID/edit-category', validateForm, async (req, res, next) => {
	try {
		const edited = await Articles.editCategory(req.body, req.params.categoryID)
		res.status(201).json({ edited })
	} catch (error) {
		next(error)
	}
})

// remove an article
router.delete('/:id/remove-article', async (req, res, next) => {
	try {
		const found = await Articles.getArticleById(req.params.id)
		if (found.length === 0) {
			return res.status(404).json({
				message: 'Article by that ID does not exist. Request terminated.'
			})
		}
		res.status(200).json(await Articles.removeArticle(req.params.id))
	} catch (error) {
		next(error)
	}
})

// remove a category
router.delete('/:id/remove-category', async (req, res, next) => {
	try {
		res.status(200).json(await Articles.removeCategory(req.params.id))
	} catch (error) {
		next(error)
	}
})

module.exports = router
