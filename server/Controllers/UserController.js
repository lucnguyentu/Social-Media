import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// get a User
export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (user) {
            const { password, ...otherDetail } = user._doc;
            res.status(403).json(otherDetail);
        } else {
            res.status(404).json('No such user exists!');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc;
            return otherDetails;
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update a user
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdmin, password } = req.body;

    try {
        const userCheck = await UserModel.findById(id);
        if (userCheck) {
            if (id === _id) {
                // if we also have to update password then password will be bcrypted again
                if (password) {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(password, salt);
                }
                // have to change this
                const user = await UserModel.findByIdAndUpdate(id, req.body, {
                    new: true,
                });
                const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, {
                    expiresIn: '1h',
                });
                res.status(404).json({ user, token });
            } else {
                res.status(403).json('Access Denied! You can update only your own Account.');
            }
        } else {
            res.status(403).json('User not exist');
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus } = req.body;

    try {
        const userCheck = await UserModel.findById(id);
        if (userCheck) {
            if (id === _id || currentUserAdminStatus) {
                const UserAdmin = await UserModel.findOne({ _id: _id });

                if (UserAdmin?.isAdmin) {
                    res.status(403).json("Can't deleted Admin");
                } else {
                    await UserModel.findByIdAndDelete(id);
                    res.status(200).json('User deleted successfully');
                }
            } else {
                await UserModel.findByIdAndDelete(id);
                res.status(200).json('User deleted successfully');
                // res.status(403).json('Access Denied! you can only delete your own profile');
            }
        } else {
            res.status(403).json('User not exist');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Follow a user
export const followUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    try {
        const userCheck = await UserModel.findById(id);
        const userFollowCheck = await UserModel.findById(_id);
        if (userCheck) {
            if (userFollowCheck) {
                // no one can follow her/himself
                if (_id === id) {
                    res.status(403).json('Action forbidden');
                } else {
                    const followUser = await UserModel.findById(id);
                    const followingUser = await UserModel.findById(_id);

                    if (!followUser.followers.includes(_id)) {
                        await followUser.updateOne({ $push: { followers: _id } });
                        await followingUser.updateOne({ $push: { followings: id } });
                        res.status(200).json('User followed!');
                    } else {
                        res.status(403).json('User is already followed by you');
                    }
                }
            } else {
                res.status(403).json('User not exist');
            }
        } else {
            res.status(403).json('User you want to follow not exist');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Unfollow user
export const unFollowUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    try {
        const userCheck = await UserModel.findById(id);
        const userFollowCheck = await UserModel.findById(_id);
        if (userCheck) {
            if (userFollowCheck) {
                // no one can follow her/himself
                if (_id === id) {
                    res.status(403).json('Action forbidden');
                } else {
                    const followUser = await UserModel.findById(id);
                    const followingUser = await UserModel.findById(_id);

                    if (followUser.followers.includes(_id)) {
                        await followUser.updateOne({ $pull: { followers: _id } });
                        await followingUser.updateOne({ $pull: { followings: id } });
                        res.status(200).json('User UnFollowed!');
                    } else {
                        res.status(403).json('User is not followed by you');
                    }
                }
            } else {
                res.status(403).json('User not exist');
            }
        } else {
            res.status(403).json('User you want to unFollow not exist');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
