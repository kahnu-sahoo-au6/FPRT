const User = require("../model/User");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { loginvalidate } = require("../Validation");
module.exports = {
	Login: async (req, res) => {
		const { error } = loginvalidate(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		User.findOne({ email: req.body.email })
			.then((data) => {
				// condatae.log(data)
				if (data) {
					compare(req.body.password, data.password).then((isCompare) => {
						if (isCompare) {
							sign(
								{ email: data.email, id: data._id },
								process.env.SECRET_KEY,
								{ expiresIn: "1d" },
								(err, token) => {
									if (err) return res.status(500).json("server error");
									res.json({
										message: "Logged in successfully",
										token: token,
										user: data,
									});
								},
							);
							// }
						} else {
							return res.json({ message: "Invalid credential" });
						}
					});
				} else {
					return res.json({ message: "Not a register user please signup !" });
				}
			})
			.catch((err) => {
				res.json({ findmail: err });
			});
	},
};
