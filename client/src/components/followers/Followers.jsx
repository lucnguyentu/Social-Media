import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';
import './Followers.scss';

const Followers = ({ person }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [following, setFollowing] = useState(person.followers.includes(user?._id));

    const handleFollow = () => {
        following ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setFollowing((prev) => !prev);
    };

    return (
        <div className="Followers">
            <div className="info">
                <img
                    src={
                        person.profilePicture
                            ? serverPublic + person.profilePicture
                            : serverPublic + 'defaultProfile.png'
                    }
                    alt=""
                />
                <div className="info-text">
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className={following ? 'btn unfollowbtn' : 'btn'} onClick={handleFollow}>
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default Followers;
