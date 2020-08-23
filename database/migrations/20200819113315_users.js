exports.up = async function(knex) {
	await knex.schema.createTable('users', (table) => {
		table.increments('id')
		table.text('firstName').notNull()
		table.text('lastName').notNull()
		table.text('userName').unique().notNull()
		table.text('password').notNull()
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('users')
}
