const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({

	role: {
		type: String,
		required: true
	},
	profilePic: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: false
	},
	otpVerified: {
		type: Boolean,
		required: false
	},
	favoriteClub: {
		type: String,
		required: false
	},
	favoriteTeam: {
		type: String,
		required: false
	},
	age: {
		type: String,
		required: false
	},
	position: {
		type: String,
		required: false
	},
	favorites: []

});

const register = module.exports = mongoose.model('register', registerSchema);