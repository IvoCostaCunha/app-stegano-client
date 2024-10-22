import React from 'react';
import AuthContextProvider from './contexts/AuthContext.js';
import DataContextProvider from './contexts/DataContext';
import AppContextProvider from './contexts/AppContext.js';
import Router from './components/Root.js';

import { RouterProvider } from 'react-router-dom';


function App() {

  return (
    <AppContextProvider>
      <AuthContextProvider>
        <DataContextProvider>
          {/* Allows use of contexts inside <Root /> */}
          {/* <Root /> */}
          <RouterProvider router={Router} />
        </DataContextProvider>
      </AuthContextProvider>
    </AppContextProvider>
  );
}

export default App;