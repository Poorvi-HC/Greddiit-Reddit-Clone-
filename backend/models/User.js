import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            max: 50,
        },
        username:{
            type:String,
            required: true,
            unique: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 7,
        },
        // picturePath:{
        //     type: String,
        //     default: ""
        // },
        user_followers:{
            type:Array,
            default:[],
        },
        user_following:{
            type:Array,
            default:[],
        },
        // user_followers_count:{
        //     type: Number,
        //     default:0,
        // },
        // user_following_count:{
        //     type: Number,
        //     default:0,
        // },
        age:{
            type: Number,
        },
        phoneno:{
            type: Number,
        },
        saved_posts:{
            type: Array,
            default: [],
        },
        joined:{
            type: Array,
            default: [],
        }
    },
    // { collection: 'Users'}
);

const User = mongoose.model("User", UserSchema);
export default User;