const router = require('express').Router()
const Users = require('../models/users-model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validation, restrict, stats } = require('../middleware/index')

router.get('/', async (req, res, next) => {
	try {
		res.status(200).json({ message: 'Users router works' })
	} catch (error) {
		next(error)
	}
})

router.get('/users', restrict, async(req, res, next)=>{
	try{
		res.json( await Users.find());
	} catch (err){
		next(err)
	}
})


router.post('/register', validation, async( req, res, next) =>{
	try{
		const { firstname, lastname, username, password } = req.body;
		const user = await Users.findBy({ username }).first()
		if (user){
			res.status(409).json({
				message: "User already taken"
			})
		}
		const newUser = await Users.add({		
			firstname,
			lastname,
			username,
			password: await bcrypt.hash(password, 15)
		});
		res.status(201).json(newUser)
	} catch(err){
		next(err)
	}
});
router.post('/login', validation, async(req, res, next=>{
try{
	cont { firstname username, password }
}
} )

module.exports = router;
