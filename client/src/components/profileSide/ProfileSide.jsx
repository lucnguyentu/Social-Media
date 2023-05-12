import React from 'react';
import FollowersCard from '../followersCard/FollowersCard';
import LogoSearch from '../logoSeacrh/LogoSearch';
import ProfileCard from '../profileCard/ProfileCard';

import './ProfileSide.scss';
const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <ProfileCard location="homepage" />
            <FollowersCard />
        </div>
    );
};

export default ProfileSide;
