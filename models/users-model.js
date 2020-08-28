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
	return db('users').select('id', 'username', 'password', 'firstName', 'lastName').where(filter).returning('id', 'username')
}

function findById(id) {
	return db('users').select('id', 'username').where('users.id', id).first()
}

async function add(user) {
	return await db('users').insert(user).select('id')
}
