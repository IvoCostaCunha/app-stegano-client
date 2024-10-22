import React, { useContext } from "react";
import { createBrowserRouter, redirect, Outlet } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext.js";

import Dashboard from './Dashboard.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignImage from './SignImage.js';
import Profile from './Profile.js';
import VerifyImage from "./VerifyImage.js";


const BuildRouter = () => {
  
  // const context = useContext(AuthContext);

  const Layout = () => {
    return (
      <Outlet />
    )
  }

  const inviteLoader = () => {
    return null
  }

  const userLoader = () => {
    const authentified = localStorage.getItem('authentified')
    console.log(authentified)
    if(authentified) {
      return null
    }
    return redirect('signin')
  }

  const rootLoader = () => {
    return null
  }

  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      loader: rootLoader,
      children: [
        {
          path: "/",
          // action: privateAction,
          loader: inviteLoader,
          element: <SignIn />,
        },
        {
          path: "signin",
          // action: privateAction,
          loader: inviteLoader,
          element: <SignIn />,
        },
        {
          path: "signup",
          // action: publicAction,
          loader: inviteLoader,
          element: <SignUp />,
        },
        {
          path: "dashboard",
          // action: publicAction,
          loader: userLoader,
          element: <Dashboard />,
        },
        {
          path: "sign-image",
          // action: publicAction,
          loader: userLoader,
          element: <SignImage />,
        },
        {
          path: "profile",
          // action: publicAction,
          loader: userLoader,
          element: <Profile />,
        },
        {
          path: "verify-image",
          // action: privateAction,
          loader: userLoader,
          element: <VerifyImage />
        }
      ],
    },
  ],{ basename: "/app"});

  return (router)
}


const Router = BuildRouter()

export default Router;
