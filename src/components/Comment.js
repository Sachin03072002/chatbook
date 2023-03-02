import React from 'react'
import styles from '../styles/home.module.css';
export default function Comment({ comment }) {
    return (
        <div className={styles.postCommentsItem}>
            <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
            </div>
            <div className={styles.postCommentContent}>Random Comment</div>
        </div>
    )
}
