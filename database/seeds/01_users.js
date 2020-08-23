exports.seed = async function(knex) {
	await knex('users').insert([
		{ firstname: 'Tiffany', lastname: 'Kei', username: 'tiff', password: 'password' },
		{ firstname: 'Taj', lastname: 'H', username: 'taj', password: 'password' }
	])
}
