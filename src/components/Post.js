import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { useToast } from 'react-toastify';
import { usePosts } from '../hooks';
import { createComment } from '../api';
import styles from '../styles/home.module.css';
import { Comment } from './';
import { create } from 'domain';
export default function Post({ post }) {
    const [comment, setComment]useState('');
    const [createingComent, setCreatingComment] = useState(false);
    const post = usePosts();
    const { addToast } = useToast();
    const handleAddComment = async (e) => {
        if (e.key == 'Enter') {
            setCreatingComment(true);
            const response = await createComment(comment.post._id);
            if (response.success) {
                setComment('');
                PostsContext.addComment(response.data.comment, post._id);
                addToast('comment cretated successfully', {
                    appearence: 'success',
                });
            } else {
                addToast(response.message, {
                    appearence: 'error'
                });
            }
            setCreatingComment(false);
        }

    };
    const handlePostLikeClick = async () => {
        const response = await toggleLike(post._id, 'Post');
        if (response.success) {
            if (response.data.deleted) {
                addToast('like removed successfully', {
                    appearence: 'success'
                });
            } else {
                addToast('like added successfully', {
                    appearence: 'success'
                });
            }
        } else {
            addToast(response.message, {
                appearence: 'error'
            });
        }
    }
    return (
        <div className={styles.postwrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-512.png" alt="user-pic" />
                </div>
                <div>
                    <Link
                        to={{ pathname: `/user/${post.user._id}`, state: { user: post.user, }, }} className={styles.postAuthor}>{post.user.name}</Link>
                    <span className={styles.postTime}> a minute ago</span>

                </div>
            </div>
            <div className={styles.postContent}>
                {post.content}
            </div>
            <div className={styles.postActions}>
                <div className={styles.postLikes}>
                    <button onClick={handlePostLikeClick}>
                        <img src="https://cdn0.iconfinder.com/data/icons/essentials-solid-glyphs-vol-1/100/Facebook-Like-Good-128.png" alt="likes-icon" />
                    </button>
                </div>
                <span>{post.likes.length}</span>
            </div>
            <div className={styles.postCommentsAction}>
                <img src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_Message-128.png" alt="comments-icon" />
                <span>{PostsContext.comment.length}</span>
            </div>
            <div className={styles.postCommentBox}>
                <input placeholder='Start Typing a comment' value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={handleAddComment} />
            </div>
            <div className={styles.postCommentsList}>
                {post.comments.map((comment) => {
                    <Comment comment={comment} key={`post-comment-${comment._id}`} />
                })};
            </div>
        </div>
    )
}
