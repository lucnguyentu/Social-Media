import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';

import Posts from '../Posts/Posts';
import PostShare from '../postShare/PostShare';
import './PostSide.scss';
import { useParams } from 'react-router-dom';

const PostSide = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    let { posts, loading } = useSelector((state) => state.postReducer);
    const params = useParams();

    useEffect(() => {
        dispatch(getTimelinePosts(user?._id));
    }, []);

    if (!posts) return 'no posts';
    if (params.id) posts = posts.filter((post) => post.userId === params.id);

    return (
        <div className="PostSide">
            <PostShare />
            {loading ? 'Fetching post...' : posts.map((post, id) => <Posts data={post} key={id} />)}
        </div>
    );
};

export default PostSide;
