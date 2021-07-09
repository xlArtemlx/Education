import React from 'react';
import {Provider} from 'react-redux';
import store from "./redux/store/store";
import {ListOfBoard} from './pages/ListOfBoards/ListOfBoard'
import './App.css';

function App() {
  return (
    <Provider store ={store}>
      <ListOfBoard/>
    </Provider>
  );
}

export default App;
