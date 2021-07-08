import {createStore,applyMiddleware } from 'redux'
import thunk, { ThunkMiddleware } from "redux-thunk";
import {AppReducer} from '../reducers/AppReducers'
import { AppActions } from "../types/actions";

export type AppState = ReturnType<typeof AppReducer>;

const store = createStore(AppReducer,
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));

export default store
