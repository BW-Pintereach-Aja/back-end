const db = require('../database/config')

module.exports = {
	add,
	find,
	findBy,
	findById
}

function find() {
	return db('users').select('id', 'username', 'firstName', 'lastName')
}

function findBy(filter) {
	return db('users').select('id', 'username', 'password', 'firstName', 'lastName').where(filter)
}

function findById(id) {
	return db('users').select('id', 'userName').where('users.id', id).first()
}

async function add(user) {
	const newUser = await db('users').insert(user).select('id', 'userName', 'password', 'userName', 'userName')
	const result = await findBy('id', 'userName', 'password', 'userName', 'userName')
	return result;
}
