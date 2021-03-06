module.exports = app => {

	const User = app.models.user;
	const Help = app.helps.crud

	const pass = require('../middleware/password')

	function configPass (v) {
		return pass.hash(v)
	}

	return {
		create: (req,res)=>{
			const user = new User();

			user.email = req.body.email
			user.login = req.body.login
			user.password = req.body.password
			user.person.fullName = req.body.person.fullName
			user.person.birthDate = new Date(req.body.person.birthDate)
			user.isAdmin = req.body.isAdmin
			user.cpf = req.body.cpf
			user.rule = req.body.rule
			user.person.gender = req.body.person.gender
			user.person.phones.phone_cell = req.body.person.phones.phone_cell
			user.person.phones.phone_fixed = req.body.person.phones.phone_fixed

			Help.createUser(user, res)
		},
		passwordUpdate: (req, res)=> {
			const query = {
				_id: req.params._id
			}
			const options = {
				returnNewDocument: true
			}
			if(req.body.password) req.body.password = configPass(req.body.password)
				const mod = {$set: {password: req.body.password }}

			//res.status(200).json({params: req.params, res: mod, query: query, options: options})
			Help.findOneAndUpdate(User, query, mod, res, options)
		},
		update: (req, res)=> {
			const query = {
				_id: req.params._id
			}
			if(req.body.password) req.body.password = configPass(req.body.password)
				const mod = req.body
				// console.log('mod: ', mod);
			Help.update(User, query, mod, res)
		},
		delete: (req,res)=>{
			const query = req.params
		},
		listAll: (req,res)=>{
			const query = {}
			const mod = {
				page: 1,
				limit: 10,
				select: '-password'
			}

			Help.listAll(User, query, mod, res)
		},
		listOne: (req,res)=>{
			const query = req.params
			const mod = {password: 0, token:0}

			Help.listOne(User, query,mod, res)
		}
	}

}