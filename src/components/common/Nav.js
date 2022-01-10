import { Link } from 'react-router-dom'
import { getUserId, isAuthenticated, removeToken } from '../../lib/auth'
import { Navbar } from 'react-bootstrap'

function Nav() {
  const isAuth = isAuthenticated()
  const handleLogout = () => {
    removeToken()
    location.reload()
  }


  return (
    <Navbar bg="" variant="light" expand="md">
    
      <Link to="/" className="homeIcon navbar-nav">
        <img alt="logo" className="logo-home nav-link me-auto"
          src ="https://i.imgur.com/ElzRumx.png"/></Link>
      
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
        </ul>
            
        <ul className="navbar-nav ms-auto">   
          {isAuth ? (
            <>
              <Link to="/" className="navbar-item nav-link active" onClick={handleLogout}>
                LOG OUT
              </Link>
              <Link to={`/profile/${getUserId()}`} className="nav-link active">
                Profile
              </Link>
            </>
          ) : (
            <div className="nav-item auth">
              <li className="nav-item">
                <Link to="/register" className="nav-link active">REGISTER</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link active">LOGIN</Link>
              </li>
            </div>
          )}      
        </ul>
      </Navbar.Collapse>
    </Navbar>   
  )
}
export default Nav