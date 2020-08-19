exports.seed = async function(knex) {
	await knex('category_article').truncate()
	await knex('categories').truncate()
	await knex('articles').truncate()
	await knex('users').truncate()
}
