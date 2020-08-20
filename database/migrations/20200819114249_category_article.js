exports.up = async function(knex) {
	await knex.schema.createTable('category_article', (table) => {
		table.integer('categoryID').references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE')
		table.integer('articleID').references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE')

		table.primary([ 'categoryID', 'articleID' ])
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('category_article')
}
