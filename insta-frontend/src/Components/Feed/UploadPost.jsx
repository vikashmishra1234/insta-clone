import React, { useContext, useState, useEffect } from 'react';
import '../../Style/feed.css';
import { ImgeUpload, updatePost } from '../Api/Services';
import ContextProvider from '../Context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const UploadPost = ({ setForm }) => {
    const [image, setImage] = useState(null);
    const [post, setPost] = useState({ caption: '', location: '' });
    const { setRecent, user, setChanges, changes, recentPost } = useContext(ContextProvider);
    const navigate = useNavigate();

    useEffect(() => {
        if (changes) {
            const fetchData = async () => {
                try {
                    await updatePost(localStorage.getItem('profileId'));
                    setChanges(!changes);
                } catch (error) {
                    console.error('Error updating post:', error);
                }
            };
            fetchData();
        }
    }, [changes, setChanges]);

    const uploadImage = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        formData.append('caption', post.caption);
        formData.append('location', post.location);
        formData.append('userId', localStorage.getItem('userId'));
        formData.append('Username', user.Username);
        formData.append('Likes', 0);
        formData.append('Profile', 'mishra');

        try {
            const res = await ImgeUpload(formData);
            if (res.message) {
                alert(res.message);
                setChanges(!changes);
            }
            setRecent([...recentPost, ...res.recent]);
            setImage(null);
            setPost({ caption: '', location: '' });
            setForm(false);
            navigate('/home');
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <form action="" className="upload" onSubmit={handleSubmit}>
            <div>
                <h2 style={{color:'black'}}>Upload Post</h2>
            </div>
            <input required type="file" onChange={uploadImage} />
            <input
                required
                name="caption"
                value={post.caption}
                onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
                placeholder="caption"
                type="text"
            />
            <input
                required
                name="location"
                value={post.location}
                onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
                placeholder="location"
                type="text"
            />
            <button type="submit">upload</button>
        </form>
    );
};

export default UploadPost;
