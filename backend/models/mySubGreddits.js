import mongoose from "mongoose"

const MySubGredditSchema = new mongoose.Schema(
    {
        name_subgre:{
            type: String,
            required: true,
            unique:true,
            min: 2,
            max: 50,
        },
        description:{
            type: String,
            required:true,
            min:2,
            max:1000,
        },
        tags:{
            type:String,
        },
        banned_keywords:{
            type:Array,
        },
        moderator:{
            type:String,
            required: true,
        },
        followers:{
            type:Array,
            default: [],
        },
        joining_requests:{
            type:Array,
            default: [],
        },
        left:{
            type:Array,
            default: [],
        },
    },
);

const MySubGreddit = mongoose.model("MySubGreddit", MySubGredditSchema)
export default MySubGreddit;