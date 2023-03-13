import MySubGreddit from "../models/mySubGreddits.js";
import User from "../models/User.js";

export const mysubgreddit = async (req, res) => {
    try {
        const {
            name_subgre,
            description,
            tags,
            banned_keywords,
            moderator,
            followers,
            joining_requests,
        } = req.body

        // console.log(moderator);
        const follow = [moderator];
        const user_info = await User.findOne({ _id: moderator });
        console.log(user_info);
        user_info.joined.push(name_subgre);
        const join = user_info.joined;
        console.log(join);
        const result = await User.updateOne(
            { _id: moderator },
            {
                $set: {
                    joined: join,
                },
            }
        );
        const user = await User.findById(moderator);
        console.log(user);
        // console.log(follow);
        const newSubGreddit = new MySubGreddit({
            name_subgre,
            description,
            tags,
            banned_keywords,
            moderator,
            followers: follow,
            joining_requests,
        });

        const sub_exist = await MySubGreddit.findOne({ name_subgre: name_subgre });
        if(sub_exist) return res.status(400).json({ message: "subgreddit already exists" });
        await newSubGreddit.save()
        res.status(200).json({ message: "mysubgreddit registered" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listMySubgreddits = async (req, res) => {
    try{
        console.log("enters listing of subgreddits");
        const id = req.user.id;
        console.log(id);
        const subgreddits = await MySubGreddit.find({ moderator: id});
        console.log(subgreddits);
        res.status(200).json(subgreddits);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

export const getSubgreddit = async (req, res) => {
    try{
        console.log("enters getSubgreddit");
        const subgreddit_id = req.params.subgreddiitId;
        console.log("subgreddit_id");
        const subgreddit = await MySubGreddit.findById(subgreddit_id).exec();
        console.log(subgreddit);
        res.status(200).json(subgreddit);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const listRequests = async (req, res) => {
    try{
        console.log("enters listing of requests");
        const id = req.user.id;
        console.log(id);
        const subgreddit_id = req.params.subgreddiitId;
        const subgreddit = await MySubGreddit.findById(subgreddit_id).exec();
        const requests = subgreddit.joining_requests;
        const user = await User.find({
            _id: { $in: requests }
        });
        console.log(user);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
} 

export const rejectRequest = async (req, res) => {
    try{
        console.log("rejectRequest");
        const subgreddiitId = req.params.subgreddiitId;
        const rejectId = req.params.rejectId;
        const id = req.user.id;
        const subgreddits = await MySubGreddit.findById(subgreddiitId);
        const index = subgreddits.joining_requests.indexOf(rejectId);
        if (index != -1){
            subgreddits.joining_requests.splice(index, 1);
        }
        const join = subgreddits.joining_requests;
        console.log(join);
        const result = await MySubGreddit.updateOne(
            { _id: subgreddiitId },
            {
                $set: {
                    joining_requests: join,
                },
            }
        );
        return res.status(200).json({ message: "user rejected" });
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
}


export const acceptRequest = async (req, res) => {
    try{
        console.log("acceptRequest");
        const subgreddiitId = req.params.subgreddiitId;
        const acceptId = req.params.acceptId;
        const subgreddits = await MySubGreddit.findById(subgreddiitId);
        const userId = req.user.id;
        const user = await User.findById(userId);
        // remove from joining_request
        const index = subgreddits.joining_requests.indexOf(acceptId);
        if (index != -1){
            subgreddits.joining_requests.splice(index, 1);
        }
        const join = subgreddits.joining_requests;
        console.log(join);
        // add to followers
        subgreddits.followers.push(acceptId);
        const follow = subgreddits.followers;

        // add name of subgreddit to users joined list.
        user.joined.push(subgreddits.name_subgre);
        const joined = user.joined;

        const result = await MySubGreddit.updateOne(
            { _id: subgreddiitId },
            {
                $set: {
                    followers: follow,
                    joining_requests: join,
                },
            }
        );

        const user_result = await User.updateOne(
            { _id: userId },
            {
                $set: {
                    joined: joined,
                },
            }
        );

        const updated_subgreddits = await MySubGreddit.findById(subgreddiitId);
        const updated_user = await User.findById(userId);
        console.log(updated_subgreddits);
        console.log(updated_user);
        return res.status(200).json({ message: "user accepted" });
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
}

export const UsersDisplay = async (req, res) => {
    try{
        console.log("displays all the users");
        const id = req.user.id;
        console.log(id);
        const subgreddit_id = req.params.subgreddiitId;
        const subgreddit = await MySubGreddit.findById(subgreddit_id).exec();
        const followers = subgreddit.followers;
        const user = await User.find({
            _id: { $in: followers }
        });
        console.log(user);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
} 