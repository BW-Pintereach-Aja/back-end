exports.seed = async function(knex) {
	await knex('categories').insert([
		{ name: 'React', desc: 'React stuff' },
		{ name: 'CSS', desc: 'CSS tricks' },
		{ name: 'Frontend', desc: 'General frontend stuff' }
	])
}
