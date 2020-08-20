const db = require('../database/config')

module.exports = {
	add,
	find,
	findBy,
	findById
}

function find() {
	return db('users').select('id', 'username', 'firstname', 'lastname')
}

function findBy(filter) {
	return db('users').select('id', 'username', 'password', 'firstname', 'lastname').where(filter)
}

function findById(id) {
	return db('users').select('id', 'username').where({ id }).first()
}

async function add(user) {
	return await db('users').insert(user).select('id')
}
