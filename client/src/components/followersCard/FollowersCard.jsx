import React from 'react';
import Followers from '../followers/Followers';
import './FollowersCard.scss';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../api/UserRequest';

const FollowersCard = () => {
    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPerson = async () => {
            const { data } = await getAllUsers();
            setPersons(data);
        };
        fetchPerson();
    }, []);

    return (
        <div className="FollowersCard">
            <h3>People may you know</h3>
            {persons.map((person, id) => {
                if (person._id !== user?._id) return <Followers person={person} key={id} />;
            })}
        </div>
    );
};

export default FollowersCard;
