import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    }
  });

const PostSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            min:2,
            max:30,
        },
        description:{
            type: String,
            required:true,
            min:2,
            max:1000,
        },
        posted_by:{
            type:String,
        },
        posted_in:{
            type: String,
        },
        upvotes:{
            type:Array,
            required: true,
            default:[],
        },
        downvotes:{
            type:Array,
            required: true,
            default:[],
        },
        comments: [commentSchema]
    },
);

const Post = mongoose.model("Post", PostSchema)
export default Post;