import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

//Pages............
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import ChatBox from "../pages/ChatBox/ChatBox";
import HomePage from "../pages/HomePage/HomePage";
import Profile from "../pages/Profile/Profile";

//Components.........
import Nav from "../Components/nav/Nav";
import LeftBar from "../Components/LeftBar/LeftBar";
import RightBar from "../Components/RightBar/RightBar";

// Firebase...................
import { auth } from "../firebaseConfig/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import EditProfile from "../Components/EditProfile/EditProfile";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "45vh 0", fontSize: "35px" }}>
        Loading...
      </div>
    );
  }

  const Feed = () => {
    return (
      <>
        <Nav />
        <main>
          <LeftBar />
          <div className="container">
            <Outlet />
          </div>
          <RightBar />
        </main>
      </>
    );
  };

  //Router...........
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/editprofile",
      element: isAuthenticated ? <EditProfile /> : <Navigate to="/signup"/>,
    },
    {
      path: "/",
      element: isAuthenticated ? <Feed /> : <Navigate to="/signup" />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/chatbox/:id",
          element: <ChatBox />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Layout;
