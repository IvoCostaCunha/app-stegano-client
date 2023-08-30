import React, { Component, createContext } from "react";

export const AppContext = createContext()

export default class AppContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentPage: "SignIn",
          apiUrlHeroku: 'https://app-stegano-api-8fb6844c2e45.herokuapp.com/api/0.1/',
          apiUrlLocal: ' http://127.0.0.1:5000/api/0.1/'
        }
    }

    setCurrentPage = (newPage) => {
      this.setState(prevState => ( {...prevState, currentPage: newPage } ));
    }

    render() {
        return (
          <AppContext.Provider value={{ ...this.state, setCurrentPage: this.setCurrentPage }}>
            {this.props.children}
          </AppContext.Provider>
        )
      }
}