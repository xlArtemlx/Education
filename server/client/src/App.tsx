import React from 'react';
import {Provider} from 'react-redux';
import store from "./redux/store/store"; 
import {useRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'
// import { Navbar } from './components/Navbar';
// import {useAuth} from './hooks/useAuth'


function App() {
  // const {login,logout,token,userId} = useAuth()
  const routes = useRoutes(false)
  return (
    <div className='container'>
      <BrowserRouter>
      {/* {isAuth&&<Navbar/>} */}
        <Provider store ={store}>
          {routes}
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
