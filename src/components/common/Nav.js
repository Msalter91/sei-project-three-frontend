import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

function Nav() {

  return (
    <Navbar bg="black" variant="dark" expand="md">
    
      <Link to="/" className="homeIcon navbar-nav">
        <img alt="logo" className="logo-home nav-link me-auto"
          src ="https://static01.nyt.com/images/2019/07/05/business/05MAD-02/merlin_157515669_325a1b1e-1bba-46e4-be63-5ea89381effe-superJumbo.jpg"/></Link>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <ul className="navbar-nav me-auto"> 
          <li className="nav-item active">
            <Link to="/aboutus" className="nav-link active">
            About Us</Link></li>
          <li className="nav-item active">
            <Link to="/countries" className="nav-link active">
            Inspire Me</Link></li>
        </ul>
            
        <ul className="navbar-nav ms-auto">   

          <div className="nav-item auth">
            <li className="nav-item">
              <Link to="/register" className="nav-link active">REGISTER</Link></li>
            <li className="nav-item">
              <Link to="/login" className="nav-link active">LOGIN</Link></li>
          </div>
                
        </ul>
      </Navbar.Collapse>
    </Navbar>   
  )
}
export default Nav