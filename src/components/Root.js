import React, { useContext } from "react"
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';

import Dashboard from './Dashboard.js';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import SignImage from './SignImage.js';
import Profile from './Profile.js';
import VerifyImage from "./VerifyImage.js";
import About from "./About.js";

import { AuthContext } from "../contexts/AuthContext"

export default function Root() {
  const authContext = useContext(AuthContext)

  const createRouter = () => {

    const inviteLoader = () => {
      return null
    }

    const userLoader = () => {
      // Takes too long need to rethink logic
      // console.log(authContext)
      // if(authContext.authentified) {
      //   return null
      // }
      return null
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
            // action: userAction,
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
          },
          {
            path: "about",
            // action: privateAction,
            loader: userLoader,
            element: <About />
          }

        ],
      },
    ], { basename: "/app" });

    return (router)
  }

  return (
    <RouterProvider router={createRouter()} />
  )
}