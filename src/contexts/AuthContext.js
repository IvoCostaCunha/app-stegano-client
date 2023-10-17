import React, { Component, createContext, useEffect, useState } from "react";

// Done using this tutorial https://www.youtube.com/watch?v=CGRpfIUURE0
export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [state, setState] = useState({
    authentified: false,
    id: Number(localStorage.getItem('id')),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    created_at: localStorage.getItem('created_at'),
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: localStorage.getItem('accessToken')
  })

  const signIn = async (signInData) => {
    try {
      const request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/auth/signin", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password
        }),

      })

      const requestJSON = await request.json()

      if (request.status === 200) {

        setState(prevState => ({ ...prevState, id: requestJSON.user.id }));
        setState(prevState => ({ ...prevState, email: requestJSON.user.email }));
        setState(prevState => ({ ...prevState, username: requestJSON.user.username }));
        setState(prevState => ({ ...prevState, created_at: requestJSON.user.created_at }));
        setState(prevState => ({ ...prevState, token: requestJSON.user.token }))
        setState(prevState => ({ ...prevState, refreshToken: requestJSON.user.refreshToken }))
        setState(prevState => ({ ...prevState, accessToken: requestJSON.user.accessToken }))
        setState(prevState => ({ ...prevState, authentified: true }))

        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        console.log(requestJSON.error)
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }

    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  const signOut = async () => {
    // Send request to purge user token on API
    try {
      const request = await fetch(`https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/auth/signout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.accessToken
        },
        body: JSON.stringify({
          id: state.id,
        })
      })
      const requestJSON = await request.json()

      // Delete cookies associated with user and state vars
      purgeStateVars()
      purgeLocalStorage()

      if (request.status === 200) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        console.log(requestJSON.error)
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }
    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  const signUp = async (signUpData) => {
    try {
      let request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/auth/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password
        }),
      });

      const requestJSON = await request.json()

      if (request.status === 201) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        console.log(requestJSON.error)
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }
    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  const updateUser = async (updateData) => {
    try {
      let request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/user/updateuser", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.accessToken
        },
        body: JSON.stringify({
          id: state.id,
          username: updateData.username,
          email: updateData.email
        }),
      });

      const requestJSON = await request.json()

      if (request.status === 200) {
        setState(prevState => ({ ...prevState, email: updateData.email }));
        setState(prevState => ({ ...prevState, username: updateData.username }));
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      }
      else {
        console.log(requestJSON.error)
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }


    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  const verifyToken = async () => {
    try {
      const request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/0.1/auth/verifytoken", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + state.accessToken
        },
        body: JSON.stringify({
          id: state.id,
          token: state.token
        })
      })

      const requestJSON = await request.json()

      if (request.status === 200) {
        console.log(requestJSON.message)
        return { message: requestJSON.message, confirmation: true, code: request.status }
      } else {
        console.log(requestJSON.error)
        return { error: requestJSON.error, confirmation: false, code: request.status }
      }
    } catch (err) {
      console.log(err)
      return { error: err.message, confirmation: false, code: "None" }
    }
  }

  const purgeLocalStorage = async () => {
    localStorage.clear();
  }

  const purgeStateVars = async () => {
    setState({})
  }

  useEffect = () => {
    localStorage.setItem('token', state.token)
    localStorage.setItem('refreshToken', state.refreshToken)
    localStorage.setItem('accessToken', state.accessToken)
    localStorage.setItem('id', state.id)
    localStorage.setItem('email', state.email)
    localStorage.setItem('username', state.username)
    localStorage.setItem('created_at', state.created_at)
  }

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, updateUser, verifyToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider