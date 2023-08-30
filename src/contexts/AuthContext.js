import React, { Component, createContext } from "react";

// Done using this tutorial https://www.youtube.com/watch?v=CGRpfIUURE0
export const AuthContext = createContext()

export default class AuthContextProvider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authentified: false,
      token: localStorage.getItem('token'),
      id: Number(localStorage.getItem('id')),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      created_at: localStorage.getItem('created_at')
    }
  }

  signIn = async (signInData) => {
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
        // this.state.token = requestJSON.token
        // this.state.id = requestJSON.id
        // this.state.email = requestJSON.email
        // this.state.username = requestJSON.username
        // this.state.created_at = requestJSON.created_at

        this.setState(prevState => ({ ...prevState, id: requestJSON.id }));
        this.setState(prevState => ({ ...prevState, email: requestJSON.email }));
        this.setState(prevState => ({ ...prevState, username: requestJSON.username }));
        this.setState(prevState => ({ ...prevState, created_at: requestJSON.created_at }));
        this.setState(prevState => ({ ...prevState, token: requestJSON.token }))
        const auth = await this.verifyToken()
        this.setState(prevState => ({ ...prevState, authentified:  auth.confirmation}))

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

  signOut = async () => {
    // Send request to purge user token on API
    try {
      const request = await fetch(`https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/auth/signout`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
        })
      })
      const requestJSON = await request.json()

      // Delete cookies associated with user and state vars
      this.purgeStateVars()
      this.purgeLocalStorage()

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

  signUp = async (signUpData) => {
    try {
      let request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/0.1/auth/signup", {
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

  updateUser = async (updateData) => {
    try {
      let request = await fetch("https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/user/updateuser", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
          username: updateData.username,
          email: updateData.email
        }),
      });

      const requestJSON = await request.json()

      if (request.status === 200) {
        this.setState(prevState => ({ ...prevState, email: updateData.email }));
        this.setState(prevState => ({ ...prevState, username: updateData.username }));
        this.updateLocalStorage(this.state.token, this.state.id, updateData.email, updateData.username, this.state.created_at)
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

  verifyToken = async () => {
    try {
      const request = await fetch("hhttps://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/auth/verifytoken", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.state.id,
          token: this.state.token
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

  updateLocalStorage = async (token, id, email, username, created_at) => {
    localStorage.setItem('token', token)
    localStorage.setItem('id', id)
    localStorage.setItem('email', email)
    localStorage.setItem('username', username)
    localStorage.setItem('created_at', created_at)
  }

  purgeLocalStorage = async () => {
    localStorage.clear();
  }

  purgeStateVars = async () => {
    this.setState(prevState => ({ ...prevState, token: '' }));
    this.setState(prevState => ({ ...prevState, id: '' }));
    this.setState(prevState => ({ ...prevState, email: '' }));
    this.setState(prevState => ({ ...prevState, username: '' }));
    this.setState(prevState => ({ ...prevState, created_at: '' }))
  }



  render() {
    return (
      <AuthContext.Provider value={{ ...this.state, signIn: this.signIn, signUp: this.signUp, signOut: this.signOut, updateUser: this.updateUser, verifyToken: this.verifyToken }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }

}