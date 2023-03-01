import { useLocation, useParams, useHistory } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { AddFriend, fetchUserProfile } from '../api';
import Loader from '../components';
const UserProfile = () => {
    // const location = useLocation();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const [requestInProgress, setRequestInProgress] = useState(false);
    const auth = useAuth();
    const history = useHistory();

    // const { user = {} } = location.state;
    useEffect(() => {
        const getUser = async () => {
            const response = await fetchUserProfile(userId);
            if (response.success) {
                setUser(response.data.user);
            } else {
                addToast(response.message, {
                    appearance: 'error',

                });
                return history.push('/');


            };
            getUser()
            setLoading(false);
        }
    }, [userId, history, addToast]);
    if (loading) {
        return <Loader />
    }
    const checkIfUserIsAFriend = () = {
        cont friends=auth.user.friends;

        const friendIds = friends.map(friend => friend.to_user._id)
        const index = friendIds.indexOf(userId);
        if(index!== -1) {
            return true;
}
return false;
    }
const showAddFriendBtn = checkIfUserIsAFriend();



const handleRemoveFriendClick = () => {
    setRequestInProgress(true);
    const response = await AddFriend(userId);
    if (response.success) {
        const friendship = auth.user.friends.filter((friend) => friend.to_user == userId);
        auth.updateUserFriends(false, friendship[0]);
        addToast('Friend deleted successfully', {
            appearance: 'success'
        });
    } else {
        addToast(response.message, {
            appearance: 'error'
        });
    }
    setRequestInProgress(false);
}
const handleAddFriendClick = () => {
    setRequestInProgress(true);
    const response = await AddFriend(userId);
    if (response.success) {
        const { friendship } = response.data;
        auth.updateUserFriends(true, friendship);
        addToast('Friend added successfully', {
            appearance: 'success'
        });
    } else {
        addToast(response.message, {
            appearance: 'error'
        });
    }
    setRequestInProgress(false);

}
return (
    <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img src="" alt="user-pic" />

        </div>
        <div className={styles.field}>
            <div className={styles.fieldLabel}>Email</div>
            <div className={styles.fieldValue}>{user.email}</div>
        </div>
        <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            <div className={styles.fieldValue}>{user.name}</div>
        </div>

        <div className={styles.btnGrp}>
            {checkIfUserIsAFriend() ? (
                <button className={`button ${styles.saveBtn}`} onClick={() => setEditMode(false)} onClick={handleRemoveFriendClick} >
                    {requestInProgress ? 'removing Friend...' : 'Remove Friend'}
                </button>
            ) : (
                <button className={`button ${styles.saveBtn}`} onClick={() => setEditMode(false)} onClick={handleAddFriendClick} disabled={requestInProgress}>
                    {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
                </button>
            )
            }



        </div>

    </div>
)
}

export default UserProfile;