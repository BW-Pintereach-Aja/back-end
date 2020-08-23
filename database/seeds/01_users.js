exports.seed = async function(knex) {
	await knex('users').insert([
		{ firstName: 'Tiffany', lastName: 'Kei', username: 'tiff', password: 'password' },
		{ firstName: 'Taj', lastName: 'H', username: 'taj', password: 'password' },
		{
			firstName: 'John',
			lastName: 'Jacob',
			username: 'user',
			password: '$2a$04$aIyxVeFaclnF2/xIwBGvY./6g94dSQ1Dgi7nR4IaPopf.jhcKVvqK'
		}
	])
}
