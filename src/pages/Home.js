import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Post, CreatePost, FriendsList } from '../components';
const Home = ({ posts }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const posts = usePosts();
    if (posts.loading) {
        return <Loader />
    }
    return (
        <div className={styles.home}>
            <CreatePost />
            <div className={styles.postsList}>
                {posts.data.map((post) => (
                    <Post post={post} key={`post-${post._id}`} />
                ))}
            </div>
            {auth.user && <FriendsList />}
        </div>

    );
}
Home.propTypes = {
    posts: PropTypes.array.isRequired,

};
export { Home };