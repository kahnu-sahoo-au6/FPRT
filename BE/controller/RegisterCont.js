const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registervalidate } = require("../Validation");

module.exports = {
   Register: async (req, res) => {
        // validate the data before make user
        const { error } = registervalidate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        // Check existing user
        const emailexit = await User.findOne({ email: req.body.email });
        if (emailexit) return res.status(403).send("email alredy exit");
    
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        // Creating a new USER
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            const savedUser = await user.save();
            const token = jwt.sign({ email:user.email,_id: user._id }, process.env.SECRET_KEY);
            res.status(200).json({Data:savedUser,token:token});
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}