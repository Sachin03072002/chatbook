import { useEffect, useState } from "react";
import { getPosts } from '../api';
import { Home, Login, Settings, UserProfile } from "../pages";
import Loader from './Loader';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom";

// const About = () => {
//   return <h1>ABOUT</h1>
// }
// const UserInfo = () => {
//   return <h1>userinfo</h1>
// }
const NotFound = () => {
  return <h1>404</h1>
}
function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          return children;
        } else {
          return <Redirect to="/login" />
        }
      }}
    />
  );
}

function App() {
  const auth = useAuth();
  if (auth.loading) {
    return < Loader />
  }
  return (
    <div className="App">

      <Router>
        <NavBar />
        <Routes>
          {/* <Route exact path="/" element={<Home posts={posts} />} /> */}
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/about" element={<About />} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Signup />} />
          <PrivateRoute exact path="/settings" element={<Settings />} />
          <PrivateRoute exact path="/user/:userId" element={<UserProfile />} />
          {/* <Route exact path="/user/asdasd" element={<UserInfo />} /> */}
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
