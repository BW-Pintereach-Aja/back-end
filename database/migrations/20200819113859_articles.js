exports.up = async function(knex) {
	await knex.schema.createTable('articles', (table) => {
		table.increments('id')
		table.text('url').notNull()
		table.text('title').notNull()
		table.text('desc')
		table.integer('userID').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('articles')
}
