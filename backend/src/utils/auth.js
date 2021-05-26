const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.hashPassword = async (password, saltRounds = 13) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}

exports.generateToken = async (id, expiresIn = 3600) => {
	const payload = {
		user: { id }
	}

	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }, (err, token) => {
			if (err) reject({ error: err, token: null });
			else resolve({ error: null, token });
		});
	});
}