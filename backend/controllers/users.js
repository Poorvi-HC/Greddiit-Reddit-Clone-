import User from "../models/User.js";
import bcrypt from "bcrypt";


export const getUser = async (req, res) => {
    try {
        console.log("entered getUser");
        const id = req.user.id;
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        console.log("entered the update user info function");
        const id = req.user.id;
        // const user = await User.findById(id);
        // console.log(user);
        console.log(JSON.stringify(id));
        const user_prev = await User.findById(id);
        const user_email_pres = await User.findOne({ email: req.body.email });
        if (user_email_pres) {
            console.log(JSON.stringify(user_email_pres._id));
            if (JSON.stringify(user_email_pres._id) !== JSON.stringify(id)) {
                return res.status(400).json({ message: " Email already in use " });
            }
        }
        let passwordHash = "";
        // const isMatch = await bcrypt.compare(req.body.password, user_prev.password);
        if (req.body.password === "" || req.body.password === user_prev.password) {
            passwordHash = user_prev.password;
        }
        else {
            const salt = await bcrypt.genSalt();
            passwordHash = await bcrypt.hash(req.body.password, salt);
        }
        // console.log(passwordHash);
        const result = await User.updateOne(
            { _id: id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    age: req.body.age,
                    phoneno: req.body.phoneno,
                    username: req.body.username,
                    password: passwordHash,
                },
            }
        );
        const user = await User.findById(id);
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const listFollowers = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        console.log(user);
        const follow = user.user_followers;
        const returning = await User.find({
            _id: { $in: follow }
        });
        res.status(200).json(returning);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const listFollowing = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        console.log(user);
        const follow = user.user_following;
        const returning = await User.find({
            _id: { $in: follow }
        });
        res.status(200).json(returning);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const removeFollowers = async (req, res) => {
    try{
        const id = req.user.id;
        const currentUser = await User.findById(id);
        console.log(currentUser);
        const followerId = req.params.followerId;
        const index_current = currentUser.user_followers.indexOf(followerId);
        if(index_current != -1){
            currentUser.user_followers.splice(index_current, 1);
        }
        const currentFollowers = currentUser.user_followers;
        //remove from current users followers
        const result_current = await User.updateOne(
            { _id: id },
            {
                $set: {
                    user_followers: currentFollowers,
                },
            }
        );
        //remove from following users following
        const user_follower = await User.findById(followerId);
        const index_follower = user_follower.user_following.indexOf(id);
        if(index_follower != -1){
            user_follower.user_following.splice(index_follower, 1);
        }
        const Following = user_follower.user_following;
        const result = await User.updateOne(
            { _id: followerId },
            {
                $set: {
                    user_following: Following,
                },
            }
        );
        return res.status(200).json({ message: "follower deleted" });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

export const removeFollowing = async (req, res) => {
    try{
        const id = req.user.id;
        const currentUser = await User.findById(id);
        console.log(currentUser);
        const followingId = req.params.followingId;
        const index_current = currentUser.user_following.indexOf(followingId);
        if(index_current != -1){
            currentUser.user_following.splice(index_current, 1);
        }
        const currentFollowing = currentUser.user_following;
        //remove from current users following
        const result_current = await User.updateOne(
            { _id: id },
            {
                $set: {
                    user_following: currentFollowing,
                },
            }
        );
        //remove from follower users followers
        console.log("followers");
        const user_follower = await User.findById(followingId);
        const index_follower = user_follower.user_followers.indexOf(id);
        if(index_follower != -1){
            user_follower.user_followers.splice(index_follower, 1);
        }
        const Follower = user_follower.user_followers;
        const result = await User.updateOne(
            { _id: followingId },
            {
                $set: {
                    user_followers: Follower,
                },
            }
        );
        return res.status(200).json({ message: "following deleted" });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};