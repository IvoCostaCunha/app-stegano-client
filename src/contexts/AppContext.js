import React, { Component, createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [state, setState] = useState({
    currentPage: "SignIn",
    apiUrlHeroku: 'https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/',
    apiUrlLocal: ' http://127.0.0.1:5000/api/0.1/'
  })

  const setCurrentPage = (newPage) => {
    setState(prevState => ( {...prevState, currentPage: newPage } ));
  }

  return(
    <AppContext.Provider value={{ ...state, setCurrentPage }}>
    {props.children}
  </AppContext.Provider>
  )
}

export default AppContextProvider