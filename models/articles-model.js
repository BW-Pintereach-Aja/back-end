const db = require('../database/config')

function getArticles() {
	return db('articles')
}

function getArticleById(id) {
	return db('articles').where('articles.id', id)
}

function getByUser(id) {
	return db('articles').where('articles.userID', id)
}

function getByCategory(id) {
	return db('category_article')
		.where('category_article.categoryID', id)
		.join('categories', 'categories.id', 'category_article.categoryID')
		.join('articles', 'articles.id', 'category_article.articleID')
		.select('articles.id', 'articles.title', 'articles.desc', 'articles.url')
}

module.exports = {
	getArticles,
	getArticleById,
	getByUser,
	getByCategory
}
