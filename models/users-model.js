const db = require('../database/config')

function find() {
	return db('users').select('id', 'username', 'firstName', 'lastName')
}

function findBy(filter) {
	return db('users').where('users.username', filter)
}

function findById(id) {
	return db('users').select('id', 'username').where('users.id', id).first()
}

async function add(user) {
	return await db('users').insert(user).select('id')
}
module.exports = {
	add,
	find,
	findBy,
	findById
}
