exports.up = async function(knex) {
	await knex.schema.createTable('categories', (table) => {
		table.increments('id')
		table.text('name').notNull().unique()
		table.text('desc')
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('categories')
}
