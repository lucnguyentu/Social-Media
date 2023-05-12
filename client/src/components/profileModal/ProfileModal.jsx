import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const param = useParams();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img);
        }
    };

    // form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append('name', fileName);
            data.append('file', profileImage);
            UserData.profilePicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append('name', fileName);
            data.append('file', coverImage);
            UserData.coverPicture = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(updateUser(param.id, UserData));
        setModalOpened(false);
        console.log('Check user: ', UserData);
    };

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form className="infoForm">
                <h3>Your Info</h3>
                <div>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstname"
                        className="infoInput"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastname"
                        className="infoInput"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Works at"
                        name="workat"
                        className="infoInput"
                        value={formData.workat}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Lives in"
                        name="livein"
                        className="infoInput"
                        value={formData.livein}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        className="infoInput"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        placeholder="Relationship status"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    Profile image
                    <input type="file" name="profileImage" onChange={onImageChange} />
                    Cover image
                    <input type="file" name="coverImage" onChange={onImageChange} />
                </div>

                <button className="btn infoButton" type="submit" onClick={handleSubmit}>
                    Update
                </button>
            </form>
        </Modal>
    );
}

export default ProfileModal;
