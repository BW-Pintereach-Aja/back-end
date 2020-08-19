exports.seed = async function(knex) {
	await knex('articles').truncate()
	await knex('users').truncate()
}
