import { Link, useHistory, useLocation } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import React from 'react'

import { logoImageLink } from '../../config'
import { isAuthenticated, removeToken } from '../../lib/auth'


function Nav() {

  const history = useHistory()
  const location = useLocation()

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  const [isLoggedIn, setIsLoggedIn] = React.useState(null)

  React.useEffect( ()=>{
    setIsLoggedIn(isAuthenticated())
  }, [location])

  return (
    <Navbar bg="" variant="light" expand="md">
    
      <Link to="/" className="homeIcon navbar-nav">
        <img alt="logo" className="logo-home nav-link me-auto"
          src ={logoImageLink}/></Link>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
        <ul className="navbar-nav me-auto"> 
          <li className="nav-item active">
            <Link to="/aboutus" className="nav-link active">
            About Us</Link></li>
          <li className="nav-item active">
            <Link to="/countries" className="nav-link active">
            Inspire Me</Link></li> 
          <li className="nav-item active">
            <Link to= "/trips/new" className="nav-link active">
            Create a Trip</Link></li>
          <li className="nav-item active">
            <Link to= "/trips" className="nav-link active">
            See Trips</Link></li>  
        </ul>
            
        <ul className="navbar-nav ms-auto">   
          {!isLoggedIn && 
                      (
                        <div className="nav-item auth">
                          <li className="nav-item">
                            <Link to="/register" className="nav-link active">REGISTER</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/login" className="nav-link active">LOGIN</Link>
                          </li>
                        </div>
                      )
          }
          {isLoggedIn && (
            <>
              <Link to="/" className="navbar-item nav-link active" onClick={handleLogout}>
                LOG OUT
              </Link>
              <Link to={'/profile'} className="nav-link active">
                Profile
              </Link>
            </>
          ) 
          }
        </ul>
      </Navbar.Collapse>
    </Navbar>   
  )
}
export default Nav