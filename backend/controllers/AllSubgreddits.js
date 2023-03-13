import MySubGreddit from "../models/mySubGreddits.js";
import User from "../models/User.js";

export const listAllJoinedSubgreddits = async (req, res) => {
    try{
        console.log("enters listing of all joined subgreddits");
        // const subgreddits = await MySubGreddit.find();
        const id = req.user.id;
        const user = await User.findById(id);
        console.log(user);
        const joined = user.joined;
        if (joined != null){
            const subgreddits = await MySubGreddit.find({
                name_subgre: { $in: joined }
            });
            console.log(subgreddits.length);
            return res.status(200).json(subgreddits);
        }
        res.status(404).json({ message: "NO JOINED SUBGREDDITS" });
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
}


export const listAllSubgreddits = async (req, res) => {
    try{
        console.log("enters listing of all subgreddits");
        const subgreddits = await MySubGreddit.find();
        return res.status(200).json(subgreddits);
    } catch(err) {
        res.status(500).json({ message: err.message});
    }
}

export const sendJoinRequest = async (req, res) => {
    try {
        const id = req.user.id;
        const subgreddiitId = req.params.subgreddiitId;
        console.log(subgreddiitId);
        const subgreddit = await MySubGreddit.findById(subgreddiitId);
        console.log(subgreddit);
        const included = subgreddit.joining_requests.includes(id);
        if (included) {
            return res.status(400).json({ message: "already requested" });
        }
        subgreddit.joining_requests.push(id);
        const join = subgreddit.joining_requests;
        const result = await MySubGreddit.updateOne(
            { _id: subgreddiitId },
            {
                $set: {
                    joining_requests: join,
                },
            }
        );
        const updated_subgreddit = await MySubGreddit.findById(subgreddiitId);
        console.log(updated_subgreddit);
        res.status(200).json(updated_subgreddit);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

