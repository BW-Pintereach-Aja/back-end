const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const authRouter = require('./routers/users-router')
const articleRouter = require('./routers/articles-router')

const server = express()
const PORT = process.env.PORT || 4000

server.use(helmet())
server.use(cors())
server.use(cookieParser())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/articles', articleRouter)

// server.use("/", (req, res) => {
// 	res.json({ message: "API is up and running..." });
// });

server.use((err, req, res, next) => {
	console.dir(err)
	res.status(500).json({ errorMessage: 'Something went wrong...' })
})

if (!module.parent) {
	server.listen(PORT, () => {
		console.log(`\n=== Server listening on port ${PORT} ===\n`)
	})
}

module.exports = server
