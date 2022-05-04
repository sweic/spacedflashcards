import React from 'react';
import Wrapper from './router/MainRouter'
import {AuthProvider} from './context/AuthContext'
import { DataProvider } from "./context/DataContext";
import {Provider} from 'react-redux'
import {store} from './redux/store'


function App() {
 
  return (
    <Provider store={store}>
      <AuthProvider>
        <DataProvider>
          <Wrapper/>
        </DataProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
