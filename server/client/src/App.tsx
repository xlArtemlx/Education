import React from 'react';
import {Provider} from 'react-redux';
import store from "./redux/store/store";
import {ListOfBoard} from './pages/ListOfBoards/ListOfBoard'
import {Register} from './pages/Register/Register'
import {useRoutes} from './routes'
import {BrowserRouter} from 'react-router-dom'


function App() {
  const routes = useRoutes(false)
  return (
    <div className='container'>
      <BrowserRouter>
        <Provider store ={store}>
          {routes}
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
