import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
const settings = () => {
    const auth = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(auth.user.email ? auth.user.email : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [savingForm, setSavingForm] = useState(false);
    const clearForm = () => {
        setPassword('');
        setConfirmPassword('');
    };
    const updateProfile = async () => {
        setSavingForm(true);
        let error = false;
        if (!name || !password || !confirmPassword) {
            addToast('please fill all the fields', {
                appearance: 'error'
            })
            error = true;
        }
        if (password !=== confirmPassword = '') {
            addToast('password and cinfrmPassword are not same', {
                appearance: 'error'
            })
            error = true;
        }
        if (error) {
            return setSavingForm(false);
        }
        const response = await auth.updateProfile(auth.user._id, name, password, confirmPassword);
        if (response.success) {
            setEditMode(false);
            setSavingForm(false);
            clearForm()
            return addToast('user updated sucessfully', {
                appearance: 'success'
            })
        } else {
            addToast(response.message, {
                appearance: 'error';
            })

        }
        setSavingForm(false);
    };
    return (
        <div className={styles.settings}>
            <div className={styles.imgContainer}>
                <img src="" alt="user-pic" />

            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <div className={styles.fieldValue}>{auth.user ? auth.user.email : "Undefinied"}</div>
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                {editMode ? (
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                ) : (
                    <div className={styles.fieldValue}>{auth.user ? auth.user.name : "Undefinied"}</div>
                )}
            </div>
            {editMode && (
                <>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Confirm Password</div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </>
            )}
            <div className={styles.btnGrp}>
                {editMode ? (
                    <>
                        <button className={`button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm}>
                            {savingForm ? 'Saving profile...' : 'Save Profile'}
                        </button>
                        <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>
                            Go Back
                        </button>
                    </>
                ) : (
                    <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>
                        Edit Profile
                    </button>
                )
                }
            </div>

        </div>
    )

}

export default settings;