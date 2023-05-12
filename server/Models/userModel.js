import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livein: String,
        workat: String,
        relationship: String,
        country: String,
        followers: [],
        followings: [],
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;
