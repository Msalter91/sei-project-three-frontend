
import { Link } from 'react-router-dom'

function Profile() {

  return (
    <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
    
        {/* <!-- Profile widget --> */}
    
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="d-flex align-items-end profile-head">
              <div className="profile mr-3"><img src="https://i.imgur.com/4zrA1gBb.jpg" alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
              </div>

              {/* {isOwner(wine.user._id) &&  */}
              <button>
                <Link to="/profileEdit" className="btn-outline-dark btn-sm btn-block">Edit Profile</Link>
                {/* {`/profile/${user_Id}/edit`} */}
              </button>

              <div className="d-flex-body mb-5 text-white">
                <h4 className="mt-0 mb-0">Alex</h4>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>United Kingdom</p>
              </div>
                
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">5</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Memories</small>
              </li>
              
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0">About</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0"> Fashion & Graphic Designer currently studying General Assembly Software Engineering Immersive course.  Lives in London</p>
              
            </div>
          </div>
          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Recent Memories</h5><a href="#" className="btn btn-link text-muted">Show all</a>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-2 pr-lg-1">
                <img src="https://i.imgur.com/LW9SNEh.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
              <div className="col-lg-6 mb-2 pl-lg-1">
                <img src="https://i.imgur.com/CPMvfQh.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
              <div className="col-lg-6 mb-2 pl-lg-1">
                <img src="https://i.imgur.com/S1z7d1G.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
              <div className="col-lg-6 mb-2 pl-lg-1">
                <img src="https://i.imgur.com/hiOMkOG.jpg" alt="" className="img-fluid rounded shadow-sm"/></div>
              <div className="col-lg-6 pl-lg-1">
                <img src="https://i.imgur.com/hO01J15.jpg" alt="" className="img-fluid rounded shadow-sm"/></div> 
            </div>
          </div>

        </div>
      </div>
    </div>
    
  )
}
    
export default Profile
