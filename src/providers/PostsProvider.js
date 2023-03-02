import { createContext } from "react";
import { useProvideAuth } from "../hooks";
const inittialState = {
    user: null,
    login: () => { },
    logout: () => { },
    loading: true,
    addPostsToState: () => { },

};
export const PostsContext = createContext(inittialState);
export const PostsProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <PostsContext.Provider value={auth}>{children}</PostsContext.Provider>
}