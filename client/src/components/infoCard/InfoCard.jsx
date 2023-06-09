import React, { useState } from 'react';
import './InfoCard.scss';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../profileModal/ProfileModal';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import * as UserApi from '../../api/UserRequest';
import { logOut } from '../../actions/AuthAction';

const InfoCard = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [modalOpened, setModalOpened] = useState(false);
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleLogOut = () => {
        dispatch(logOut());
    };

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user?._id) {
                setProfileUser(user);
            } else {
                console.log('fetching');
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log(profileUser);
            }
        };
        fetchProfileUser();
    }, [user]);

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>Profile Info</h4>
                {user?._id === profileUserId ? (
                    <div>
                        <UilPen width="2rem" height="1.2rem" onClick={() => setModalOpened(true)} />
                        <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
                    </div>
                ) : (
                    ''
                )}
            </div>

            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>

            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>{profileUser.livein}</span>
            </div>

            <div className="info">
                <span>
                    <b>Works at </b>
                </span>
                <span>{profileUser.workat}</span>
            </div>

            <button
                className="btn"
                style={{
                    width: '7rem',
                    height: '2rem',
                    marginTop: '6rem',
                    alignSelf: 'flex-end',
                }}
                onClick={handleLogOut}
            >
                Logout
            </button>
        </div>
    );
};

export default InfoCard;
