import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../api';

const NavBar = () => {
    const auth = useAuth();
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await searchUsers(searchText);
            if (response.success) {
                setResults(response.data.users);
            }
        };
        if (searchText.length > 2) {
            fetchUsers();
        } else {
            setResults([]);
        }

    }, [searchText]);
    return (
        <div className={styles.nav}>
            <div className={styles.leftDiv}>
                <a href="/">
                    <img src="" alt="" />
                </a>

            </div>
            <div className={styles.searchContainer}>
                <img src="" alt="search-icon" className={styles.searchIcon} />
                <input type="text" placeholder='Search Users' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                {results.length > 0 && <div className={styles.searchResults}>
                    <ul>
                        {results.map(user => {
                            <li className={styles.searchResultsRow} key={`user-${user._id}`}>
                                <Link to={`/user/${user._id}`}>
                                    <img src="" alt="user-image" />
                                    <span>{user.name}</span>
                                </Link>
                            </li>
                        })}
                    </ul>
                </div>}
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