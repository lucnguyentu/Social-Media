import React from 'react';
import InfoCard from '../infoCard/InfoCard';
import LogoSearch from '../logoSeacrh/LogoSearch';
import FollowersCard from '../followersCard/FollowersCard';

const ProfileLeft = () => {
    return (
        <div className="ProfileSide">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileLeft;
