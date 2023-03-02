import { useState } from 'react';
import styles from '../styles/home.module.css';
import { addPost } from '../api';
import { useToast } from 'react-toastify';
import { usePosts } from '../hooks';
import { response } from 'express';
const CreatePost = () => {
    const [post, setPost] = useState('');
    const [addingPost, setAddingPost] = useState(false);
    const { addToast } = useToast();
    const posts = usePosts();
    const handleAddPostClick = async() = {
        setAddingPost(true);
        const response = await addPost(post);
        if(response.success){
            setPost('');
    posts.addPostsToState(response.data.post);
    addToast('Post created successfully', {
        appearance: 'success',
    })
}else {
    addToast(response.message, {
        appearance: 'error',
    })
        }
setAddingPost(false);
    };
return <div className={styles.createPost}>
    <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}

    />
    <div>
        <button className={styles.addBtn} onClick={handleAddPostClick} disabled={addingPost}>
            {addingPost ? 'adding Post..' : 'add Post'}
        </button>
    </div>
</div>
}
export default CreatePost;