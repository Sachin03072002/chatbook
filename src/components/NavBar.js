import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
const NavBar = () => {
    const auth = useAuth();

    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img src="" alt="" />
                </a>

            </div>
            <div className={styles.rightNav}>
                {/* as api is not woring */}
                {/* <auth.user && div className={styles.user}> */}
                <div className={styles.user}>
                    <Link to="/settings">
                        <img src="https://img.icons8.com/ios-filled/512/user.png" alt="user-pic" className={styles.userDp} />
                    </Link>
                    <span>{auth.user.name}</span>
                </div>
                <div className={styles.navLinks}>

                    <ul>
                        {auth.user ? (
                            <>
                                <li OnCLick={auth.logout}>
                                    Log out
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Log in</Link>
                                </li>

                                <li>
                                    <Link to="/signin">Register</Link>
                                </li>
                            </>
                        )

                        }


                    </ul>
                </div>
            </div>
        </div >
    );
}

export default NavBar;