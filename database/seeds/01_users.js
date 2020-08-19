exports.seed = async function(knex) {
	await knex('users').insert([
		{ firstName: 'Tiffany', lastName: 'Kei', username: 'tiff', password: 'password' },
		{ firstName: 'Taj', lastName: 'H', username: 'taj', password: 'password' }
	])
}
