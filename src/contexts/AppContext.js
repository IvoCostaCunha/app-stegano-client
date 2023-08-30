import React, { Component, createContext } from "react";

export const AppContext = createContext()

export default class AppContextProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
          currentPage: "SignIn",
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