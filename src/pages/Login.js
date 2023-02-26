import React from 'react'
import styles from '../styles/login.module.css'
export default function Login() {
    return (
        <form action="" className={styles.loginForm}>
            <span className={styles.loginSignUpHeader}>
                Log In
            </span>
            <div className={styles.field}>
                <input type="email" placeholder="Email" required />
            </div>
            <div className={styles.field}>
                <input type="password" placeholder="Password" required />
            </div>
            <div className={styles.field}>
                <button>
                    Log In
                </button>
            </div>
        </form>
    );

}
