import PostModel from '../Models/postModel.js';
import UserModel from '../Models/userModel.js';
import mongoose from 'mongoose';

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get a post
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(403).json('Post is not exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);
        const userExist = await UserModel.findById(userId);
        if (post) {
            if (userExist) {
                if (post.userId === userId) {
                    await post.updateOne({ $set: req.body });
                    res.status(200).json('Post Updated');
                } else {
                    // res.status(403).json('Action forbidden');
                    await post.updateOne({ $set: req.body });
                    res.status(200).json('Post Updated');
                }
            } else {
                res.status(403).json('UserId not exist to conduct action');
            }
        } else {
            res.status(403).json('Post is not exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);
        if (post) {
            if (post.userId === userId) {
                await post.deleteOne();
                res.status(200).json('Post Deleted successfully');
            } else {
                // res.status(403).json('Action forbidden');
                await post.deleteOne();
                res.status(200).json('Post Deleted successfully');
            }
        } else {
            res.status(401).json('Post is not exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// like and dislike the post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);
        const user = await UserModel.findById(userId);
        if (post) {
            if (user) {
                if (!post.likes.includes(userId)) {
                    await post.updateOne({ $push: { likes: userId } });
                    res.status(200).json('Post liked');
                } else {
                    await post.updateOne({ $pull: { likes: userId } });
                    res.status(200).json('Post unliked');
                }
            } else {
                res.status(403).json('UserId not exist to conduct action');
            }
        } else {
            res.status(403).json('Post is not exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Timeline POsts
export const getTimeLinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);
        if (user) {
            const currentUserPosts = await PostModel.find({ userId: userId });
            const followingPosts = await UserModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userId),
                    },
                },
                {
                    $lookup: {
                        from: 'posts', // posts is the name of PostModel in db
                        localField: 'followings', // field in current model, it contain array with userIds
                        foreignField: 'userId', // field in posts of postmodel
                        as: 'followingPosts', // comibine 2 field by userId become to new field followingPosts with UserModel.followings.userId.includes(PostModel.userId)
                    },
                },
                {
                    $project: {
                        followingPosts: 1, // return just 1 field which is the followingPosts
                        _id: 0, // neglect that field _id
                    },
                },
            ]);

            res.status(200).json(
                currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => b.createdAt - a.createdAt),
            ); // combine posts from user and follower of user and sort follow datetime was created to show
            // means latest posts will appear first (decend order)
        } else {
            res.status(403).json('UserId not exist');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};
