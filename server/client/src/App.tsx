import React from 'react';
import {Provider} from 'react-redux';
import store from "./redux/store/store"; 
import {useRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import {useAuth} from './hooks/useAuth'


function App() {
  const {token,login,logout,userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)
  console.log(isAuth)
  return (
    <AuthContext.Provider value ={{
      token,login,logout,userId,isAuth
    }}
    >
      <div className='container'>
        <BrowserRouter>
        {isAuth&&<Navbar/>}
          <Provider store ={store}>
            {routes}
          </Provider>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
