import React from 'react'
import {Route, Switch,Redirect} from 'react-router-dom'
import { ListOfBoard } from './pages/ListOfBoards/ListOfBoard'
import { Board } from './pages/Board/Board'
import { Register } from './pages/Register/Register'

export const useRoutes = (isAuthenticated:any):any => {
    if(isAuthenticated){
        return (
            <Switch>
                <Route path='/list' exact>
                    <ListOfBoard/>
                </Route>
                <Route path='/board' exact>
                    <Board/>
                </Route>
                <Redirect to='/list'/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/'>
                <Register/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    )
}