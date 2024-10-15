import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useParams,
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
import EditProfile from "../Components/EditProfile/EditProfile";
import SearchUser from "../Components/SearchUser/SearchUser";

const Layout = () => {


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
      element:<EditProfile />,
    },
    {
      path: "/",
      element: <Feed />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: `/chatbox/:id`,
          element: <ChatBox />,
        },
        {
          path: `/profile/:id`,
          element: <Profile />,
        },
        {
          path: `/searchuser`,
          element: <SearchUser />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Layout;
