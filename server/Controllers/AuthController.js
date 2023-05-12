import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registering a new user
export const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10); // amout of letter after hashed
    const { username, password } = req.body;
    const oldPass = password;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new UserModel(req.body);

    // if (!username) {
    //     res.status(403).json('Missing username');
    //     return;
    // }

    if (!oldPass) {
        res.status(403).json('Missing password');
        return;
    }

    try {
        const oldUser = await UserModel.findOne({ username: username });
        if (oldUser) {
            return res.status(403).json('username is already registered!');
        }

        const user = await newUser.save();
        const token = jwt.sign(
            {
                username: user.username,
                id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' },
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        res.status(400).json('Missing username');
        return;
    }

    if (!password) {
        res.status(403).json('Wrong password');
        return;
    }

    try {
        const user = await UserModel.findOne({ username: username });

        if (user) {
            const validity = await bcrypt.compare(password, user.password);

            if (!validity) {
                res.status(403).json('Wrong Password');
            } else {
                const token = jwt.sign(
                    {
                        username: user.username,
                        id: user._id,
                    },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' },
                );
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json('User not exists');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
