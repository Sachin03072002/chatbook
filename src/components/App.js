import { useEffect, useState } from "react";
import { getPosts } from '../api';
import { Home, Login } from "../pages";
import Loader from './Loader';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const About = () => {
  return <h1>ABOUT</h1>
}
const UserInfo = () => {
  return <h1>userinfo</h1>
}
const NotFound = () => {
  return <h1>404</h1>
}

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      console.log('response', response);
      if (response.success) {
        setPosts(response.data.posts)
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);
  if (loading) {
    return < Loader />
  }
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home posts={posts} />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/user/asdasd" element={<UserInfo />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
