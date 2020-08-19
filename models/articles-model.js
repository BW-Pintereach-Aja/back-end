const db = require('../database/config')

function getArticles() {
	return db('category_article')
		.join('categories', 'categories.id', 'category_article.categoryID')
		.join('articles', 'articles.id', 'category_article.articleID')
		.join('users', 'users.id', 'articles.userID')
		.select(
			'users.username as user',
			'users.id as userID',
			'categories.name as category',
			'categories.desc as aboutCategory',
			'articles.title as articleTitle',
			'articles.desc as articleDesc'
		)
}

function getArticleById(id) {
	return db('articles')
		.where('articles.id', id)
		.join('users', 'users.id', 'articles.userID')
		.join('category_article', 'category_article.articleID', 'articles.id')
		.join('categories', 'categories.id', 'category_article.categoryID')
		.select(
			'users.id as userID',
			'users.username as user',
			'articles.id as articleID',
			'articles.title',
			'articles.desc',
			'category_article.categoryID',
			'categories.name as categoryName'
		)
}

function getByUser(id) {
	return db('articles')
		.where('articles.userID', id)
		.join('category_article', 'category_article.articleID', 'articles.id')
		.join('categories', 'categories.id', 'category_article.categoryID')
		.join('users', 'users.id', 'articles.userID')
		.select(
			'users.id as userID',
			'users.username as user',
			'articles.id as articleID',
			'articles.title',
			'articles.desc',
			'category_article.categoryID',
			'categories.name as categoryName'
		)
}

function getByCategory(id) {
	return db('category_article')
		.where('category_article.categoryID', id)
		.join('categories', 'categories.id', 'category_article.categoryID')
		.join('articles', 'articles.id', 'category_article.articleID')
		.select('articles.id', 'articles.title', 'articles.desc', 'articles.url')
}

function addArticle(post) {
	return db('articles').insert(post)
}

function addToCategory(category) {
	return db('category_article').insert(category)
}

module.exports = {
	getArticles,
	getArticleById,
	getByUser,
	getByCategory,
	addArticle,
	addToCategory
}
