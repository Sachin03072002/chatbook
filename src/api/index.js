import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from "../utlis";
// import './app.js';

const customFetch = async (url, { body, ...customConfig }) => {
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    const headers = {
        'content-type': 'appication/x-www-form-urlencoded',
        Accept: 'application/json'
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };
    if (body) {
        config.body = getFormBody(body);
    }
    try {
        const response = await fetch(url, { ...config, mode: 'no-cors' });

        const data = await response.json();
        if (data.success) {
            return {
                data: data.data,
                success: true

            };
        }
        throw new Error(data.message);



    } catch (error) {
        console.log('error');
        return {
            message: error.message,
            success: false,
        }
    }
};

export const getPosts = (page = 1, limit = 5) => {

    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET',

    });
}
export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method: 'POST',
        body: { email, password },
    });
}
export const register = async (name, email, password, confirmPassword) => {
    return customFetch(API_URLS.signup(), {
        method: 'POST',
        body: { name, email, password, confirmPassword: confirmPassword },
    });
};
export const editProfile = async (userId, name, email, password, confirmPassword) => {
    return customFetch(API_URLS.editUser(), {
        method: 'POST',
        body: { id: userId, name, email, password, confirmPassword: confirmPassword },
    });
};

export const fetchUserProfile = async (userId) => {
    return customFetch(API_URLS.userInfo(userId), {
        method: 'GET',
    });
};

export const fetchUserFriends = async () => {
    return customFetch(API_URLS.friends(), {
        method: 'GET',
    });
};

export const AddFriend = async (userId) => {
    return customFetch(API_URLS.createFriendship(userId), {
        method: 'POST',
    });
};