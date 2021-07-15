import React from 'react'
import { NavLink ,useHistory,RouteComponentProps} from 'react-router-dom'

export const Navbar = () => {
    const history:RouteComponentProps['history'] = useHistory()
    // const auth =useContext(AuthContext)

    const logout = (event:React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        // auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to='/'>Sass</NavLink></li>
                <li><NavLink to='/'>Sass</NavLink></li>
                <li><NavLink to='/'>Sass</NavLink></li>
            </ul>
            </div>
        </nav>
    )
}