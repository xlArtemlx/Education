import React,{useContext} from 'react'
import { NavLink ,useHistory,RouteComponentProps} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history:RouteComponentProps['history'] = useHistory()
    const auth = useContext(AuthContext)

    const out = (event:React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue darken-1" style={{padding: '0 2rem'}}>
            <a href='/' className='brand-logo'>Education</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li onClick={out}><NavLink to='/'>Выход</NavLink></li>
            </ul>
            </div>
        </nav>
    )
}