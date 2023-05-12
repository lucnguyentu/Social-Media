import React from 'react';
import PostSide from '../../components/postSide/PostSide';
import RightSide from '../../components/rightSide/RightSide';
import ProfileSide from '../../components/profileSide/ProfileSide';
import './Home.scss';

const Home = () => {
    return (
        <div className="Home">
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    );
};

export default Home;
