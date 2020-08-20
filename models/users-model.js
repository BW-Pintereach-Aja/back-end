const db = require('../database/config')

module.exports = {
	add,
	find,
	findBy,
	findById
}

async function add(user) {
	const [ id ] = await db('users').insert(user)
	return findById(id)
}

function find() {
	return db("users").select("id", "username", "firstname", "lastname")
}

function findBy(filter) {
	return db('users').select('id', 'username', 'password', 'firstname', 'lastname').where(filter)
}

function findById(id) {
	return db('users').select('id', 'username').where({ id }).first()
}
