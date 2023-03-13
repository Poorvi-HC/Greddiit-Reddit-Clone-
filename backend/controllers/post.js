import MySubGreddit from "../models/mySubGreddits.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const post = async (req, res) => {
    try {
        const {
            title,
            description,
            posted_by,
            posted_in,
        } = req.body

        const newPost = new Post({
            title,
            description,
            posted_by,
            posted_in,
        });
        
        console.log("entered post function and stored data in database");
        // const post_exist = await MySubGreddit.findOne({ name_subgre: name_subgre });
        // if(sub_exist) return res.status(400).json({ message: "subgreddit already exists" });
        await newPost.save()
        res.status(200).json({ message: "post registered" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPost = async (req, res) => {
    try {
        console.log("enters listing of posts");
        const subgreddiitId = req.params.subgreddiitId;
        console.log(subgreddiitId);
        const posts = await Post.find({ posted_in: subgreddiitId });
        console.log(posts);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const upvotePost = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(id);
        console.log("upvoted Post");
        const postId = req.params.postId;
        console.log(postId);
        const post = await Post.findById(postId);
        console.log(post);
        const included = post.upvotes.includes(id);
        if (included) {

            return res.status(400).json({ message: "already upvoted" });
        }
        console.log(post.upvotes);
        post.upvotes.push(id);
        console.log(post.upvotes);
        const result = await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    upvotes: post.upvotes,
                },
            }
        );
        const updated_post = await Post.findById(postId);
        console.log(updated_post);
        res.status(200).json(updated_post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const downvotePost = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(id);
        console.log("downvoted Post");
        const postId = req.params.postId;
        console.log(postId);
        const post = await Post.findById(postId);
        console.log(post);
        const included = post.downvotes.includes(id);
        if (included) {
            return res.status(400).json({ message: "already downvoted" });
        }
        // console.log(post.upvotes) ;
        post.downvotes.push(id);
        // console.log(post.upvotes) ;
        const result = await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    downvotes: post.downvotes,
                },
            }
        );
        const updated_post = await Post.findById(postId);
        console.log(updated_post);
        res.status(200).json(updated_post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const savePost = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(id);
        console.log("save post");
        const postId = req.params.postId;
        console.log(postId);
        const user = await User.findById(id);
        const included = user.saved_posts.includes(postId);
        if (included) {
            return res.status(400).json({ message: "saved posts" });
        }

        user.saved_posts.push(postId);
        const result = await User.updateOne(
            { _id: id },
            {
                $set: {
                    saved_posts: user.saved_posts,
                },
            }
        );

        const updated_user = await User.findById(id);
        console.log(updated_user);
        res.status(200).json(updated_user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const savedList = async (req, res) => {
    console.log("create");
    try {
        const id = req.user.id;
        console.log(id);
        const user = await User.findById(id);
        console.log(user);
        const postId = user.saved_posts;
        console.log(postId);
        if (postId != null) {
            const posts = await Post.find({
                _id: { $in: postId }
            });
            return res.status(200).json(posts);
        }
        res.status(404).json({ message: "NO SAVED POSTS YET" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const addComment = async (req, res) => {
    try {
        const id = req.user.id;
        console.log(id);
        const postId = req.params.postId;
        console.log(postId);
        const text = req.body.text;
        console.log(text);
        const user = await User.findById(id);
        const username = user.username;
        console.log(user);
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        console.log(post);
        const newComment = {
            text: text, 
            user: username,
        };
        console.log(newComment);
        post.comments.push(newComment);
        console.log(post.comments);
        //   const updatedPost = await post.save();
        const result = await Post.updateOne(
            { _id: postId },
            {
                $set: {
                    comments: post.comments,
                },
            }
        );
        const updated_post = await Post.findById(postId);
        console.log(updated_post);
        res.status(200).json(updated_post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const removeSavedPost = async (req, res) => {
    try { 
        const id = req.user.id;
        const postId = req.params.postId;
        console.log(id);
        const user = await User.findById(id);
        // remove Saved post
        const index = user.saved_posts.indexOf(postId);
        if (index != -1){
            user.saved_posts.splice(index, 1);
        }
        const saved = user.saved_posts;
        console.log(saved);
        const result = await User.updateOne(
            { _id: id },
            {
                $set: {
                    saved_posts: saved,
                },
            }
        );
        return res.status(200).json({ message: "post safely removed" });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
};

export const followUser = async (req, res) => {
    try{
        const id = req.user.id;
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const postedUserId = post.posted_by;
        const postedUser = await User.findById(postedUserId);
        // need to update followers of posteduser
        const included = postedUser.user_followers.includes(id);
        if(included){
            return res.status(300).json({ message: "already follows" });
        }
        if(id === postedUserId){
            return res.status(300).json({ message: "cannot follow ourselves"});
        }
        postedUser.user_followers.push(id);
        const followers = postedUser.user_followers;
        //need to update following of current user
        const currentUser = await User.findById(id);
        currentUser.user_following.push(postedUserId);
        const following = currentUser.user_following;
        const result_followers = await User.updateOne(
            { _id: postedUserId },
            {
                $set: {
                    user_followers: followers,
                },
            }
        );
        const result_following = await User.updateOne(
            { _id: id },
            {
                $set: {
                    user_following: following,
                },
            }
        );
        return res.status(200).json({ message: "follow user who posted the post" });
    } catch(err){
        res.status(500).json({ message: err.message });
    }
}

