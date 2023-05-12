import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ProfileCard.scss';

const ProfileCard = ({ location }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts } = useSelector((state) => state.postReducer);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img
                    src={user?.coverPicture ? serverPublic + user?.coverPicture : serverPublic + 'defaultCover.jpg'}
                    alt="CoverImage"
                />
                <img
                    src={
                        user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + 'defaultProfile.png'
                    }
                    alt="ProfileImage"
                />
            </div>

            <div className="ProfileName">
                <span>
                    {user?.firstname} {user?.lastname}
                </span>
                <span>{user?.workat ? user?.workat : 'Write about your self'}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div className="wrapper">
                    <div className="follow">
                        <span>{user?.followings.length}</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user?.followers.length}</span>
                        <span>Followers</span>
                    </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts.filter((post) => post.userId === user?._id).length}</span>
                                <span>Post</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>

            {location === 'profilePage' ? (
                ''
            ) : (
                <span className="myProfile">
                    <Link to={`/profile/${user?._id}`}>My Profile</Link>
                </span>
            )}
        </div>
    );
};

export default ProfileCard;
