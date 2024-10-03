import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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



const Layout = () => {

  //Feed.............
  const Feed = ()=>{
    return(
      <>
      <Nav/>
      <main>
        <LeftBar/>
        <div className="container">
          <Outlet/>
        </div>
        <RightBar/>
      </main>
      </>
    )
  }



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
      path: "/",
      element: <Feed/>,
      children : [
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/chatbox/:id",
          element: <ChatBox/>
        },
        {
          path: "/profile/:id",
          element: <Profile/>
        },
      ]
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Layout;
