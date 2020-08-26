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
			'articles.id as articleID',
			'articles.title as articleTitle',
			'articles.desc as articleDesc',
			'articles.url'
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
			'articles.url',
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
			'articles.url',
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

function getCategories() {
	return db('categories').select('categories.id', 'categories.name', 'categories.desc')
}

function addArticle(post) {
	return db('articles').insert(post).returning('articles.id')
}

function addToCategory(category) {
	return db('category_article').insert(category).returning('category_article.categoryID')
}

function addCategory(category) {
	return db('categories').insert(category)
}

function findCategory(name) {
	return db('categories').where('categories.name', name)
}

function editArticle(article, id) {
	return db('articles')
		.update(article)
		.where('articles.id', id)
		.select('articles.title', 'articles.desc', 'articles.url')
}

function editCategory(category, id) {
	return db('categories').update(category).where('categories.id', id).select('categories')
}

function removeArticle(id) {
	return db('articles').delete('articles').where('articles.id', id)
}

function removeCategory(id) {
	return db('categories').delete('categories').where('categories.id', id)
}

module.exports = {
	getArticles,
	getArticleById,
	getByUser,
	getByCategory,
	getCategories,
	addArticle,
	addToCategory,
	addCategory,
	findCategory,
	editArticle,
	editCategory,
	removeArticle,
	removeCategory
}
