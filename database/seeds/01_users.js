exports.seed = async function(knex) {
	await knex('users').insert([
		{ firstName: 'Tiffany', lastName: 'Kei', userName: 'tiff', password: 'password' },
		{ firstName: 'Taj', lastName: 'H', userName: 'taj', password: 'password' }
	])
}
