import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            username,
            email,
            password,
            // picturePath,
            user_followers,
            user_following,
            age,
            phoneno,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: passwordHash,
            // picturePath,
            user_followers,
            user_following,
            age,
            phoneno,
        });

        await newUser.save()
        res.status(200).json({message: "user registered"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



/* LOGIN */
export const login = async (req, res) => {
    console.log("login entered")
    try {
        const { email,
                password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
        console.log("matched");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};