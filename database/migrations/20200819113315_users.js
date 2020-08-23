exports.up = async function(knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('id')
		table.text('firstname').notNull()
		table.text('lastname').notNull()
		table.text('username').unique().notNull()
		table.text('password').notNull()
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('users')
}
