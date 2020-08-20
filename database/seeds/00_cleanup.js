const cleaner = require('knex-cleaner')

exports.seed = async function(knex) {
	await cleaner.clean(knex, {
		mode: 'truncate',
		restartIdentity: true,
		ignoreTables: [ 'knex_migrations', 'knex_migrations_lock' ]
	})
	await knex('category_article').truncate()
	await knex('categories').truncate()
	await knex('articles').truncate()
	await knex('users').truncate()
}
