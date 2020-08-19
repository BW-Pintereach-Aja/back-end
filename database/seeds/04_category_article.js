exports.seed = async function(knex) {
	await knex('category_article').insert([
		{ articleID: 1, categoryID: 2 },
		{ articleID: 2, categoryID: 1 },
		{ articleID: 3, categoryID: 1 },
		{ articleID: 4, categoryID: 3 },
		{ articleID: 5, categoryID: 1 }
	])
}
