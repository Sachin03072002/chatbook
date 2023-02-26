import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
const NavBar = () => {
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img src="" alt="" />
                </a>

            </div>
            <div className={styles.rightNav}>
                <div className={styles.user}>
                    <a href="/">
                        <img src="https://img.icons8.com/ios-filled/512/user.png" alt="user-pic" className={styles.userDp} />
                    </a>
                    <span>Sachin</span>
                </div>
                <div className={styles.navLinks}>
                    <ul>
                        <li>
                            <Link to="/login">Log in</Link>
                        </li>
                        <li>
                            <Link to="/logout">Log out</Link>
                        </li>
                        <li>
                            <Link to="/signin">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default NavBar;