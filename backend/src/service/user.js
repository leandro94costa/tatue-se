const User = require('../models/User');
const { formatMessageApi } = require('../utils/messages');
const { hashPassword, generateToken } = require('../utils/auth');

exports.save = async ({ email, password, userType }) => {
	try {
		let user = await User.findOne({ email });

		if (user) return formatMessageApi([{ msg: 'User already exists' }], 400, 'errors');

		user = new User({ email, password, userType });
		user.password = await hashPassword(password);

		await user.save();

		return await generateToken(user.id);
	} catch (err) {
		console.log(err.message);
		return formatMessageApi(err, 500);
	}
}