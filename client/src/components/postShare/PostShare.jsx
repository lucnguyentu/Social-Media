import React, { useRef, useState } from 'react';
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons';
import { useSelector, useDispatch } from 'react-redux';

import './PostShare.scss';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

const PostShare = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const loading = useSelector((state) => state.postReducer.uploading);
    const [image, setImage] = useState(null);
    const desc = useRef();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    // handle Image Change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    const imageRef = useRef();

    // handle post upload
    const handleUpload = async (e) => {
        e.preventDefault();

        //post data
        const newPost = {
            userId: user?._id,
            desc: desc.current.value,
        };

        // if there is an image with post
        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append('name', fileName);
            data.append('file', image);
            newPost.image = fileName;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(uploadPost(newPost));
        resetShare();
    };

    // Reset Post Share
    const resetShare = () => {
        setImage(null);
        desc.current.value = '';
    };

    return (
        <div className="PostShare">
            <img
                src={user?.profilePicture ? serverPublic + user?.profilePicture : serverPublic + 'defaultProfile.png'}
                alt=""
            />
            <div className="postStatus">
                <input type="text" placeholder="What's happening" required ref={desc} />
                <div className="postOptions">
                    <div className="option" onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option">
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option">
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option">
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className="btn" onClick={handleUpload} disabled={loading}>
                        {loading ? 'Uploading...' : 'Share'}
                    </button>

                    <div style={{ display: 'none' }}>
                        <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="PreviewImage">
                        <UilTimes onClick={() => setImage(null)} className="btn" />
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
