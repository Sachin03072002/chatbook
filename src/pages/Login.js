import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useAuth();
    console.log(auth);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoggingIn(true);
        if (!email || !password) {
            return toast.error('Please enter both email and password', { autoClose: 3000 });
        }
        const response = await auth.login(email, password);
        if (response.success) {
            toast.success('Successfully Logged In', { autoClose: 3000 });
        } else {
            toast.error(response.message, { autoClose: 3000 });
        }
        setLoggingIn(false);
    };


    return (
        <>
            <ToastContainer />
            <form action="" className={styles.loginForm} onSubmit={handleSubmit}>
                <span className={styles.loginSignUpHeader}>
                    Log In
                </span>
                <div className={styles.field}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={styles.field}>
                    <button disabled={loggingIn}>
                        {loggingIn ? 'Logging in...' : 'Log In'}
                    </button>
                </div>
            </form>
        </>
    );

}
