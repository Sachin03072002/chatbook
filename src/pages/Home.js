import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
const Home = ({ posts }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getPosts();
            console.log('response', response);
            if (response.success) {
                setPosts(response.data.posts)
            }
            setLoading(false);
        }
        fetchPosts();
    }, []);
    if (loading) {
        return <Loader />
    }
    return (
        <div className={styles.postsList}>
            {posts.map((post) => (
                <div className={styles.postwrapper} key={`post-${post._id}`}>
                    <div className={styles.postHeader}>
                        <div className={styles.postAvatar}>
                            <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png" alt="user-pic" />
                        </div>
                        <div>
                            <span className={styles.postAuthor}>{post.user.name}</span>
                            <span className={styles.postTime}> a minute ago</span>

                        </div>
                    </div>
                    <div className={styles.postContent}>
                        {post.content}
                    </div>
                    <div className={styles.postActions}>
                        <div className={styles.postLikes}>
                            <img src="https://cdn0.iconfinder.com/data/icons/essentials-solid-glyphs-vol-1/100/Facebook-Like-Good-128.png" alt="likes-icon" />
                        </div>
                        <span>5</span>
                    </div>
                    <div className={styles.postCommentsAction}>
                        <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_Message-128.png" alt="comments-icon" />
                        <span>2</span>
                    </div>
                    <div className={styles.postCommentBox}>
                        <input placeholder='Start Typing a comment' />
                    </div>
                    <div className={styles.postCommentsList}>
                        <div className={styles.postCommentsItem}>
                            <div className={styles.postCommentHeader}>
                                <span className={styles.postCommentAuthor}>Bill</span>
                                <span className={styles.postCommentTime}>a minute ago</span>
                                <span className={styles.postCommentLikes}>22</span>
                            </div>
                            <div className={styles.postCommentContent}>Random Comment</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
}
Home.propTypes = {
    posts: PropTypes.array.isRequired,

};
export default Home;