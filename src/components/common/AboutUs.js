function AboutUs() {
  return (
    <div className="aboutus-bg clearfix container">

      <img src="https://i.imgur.com/tNUbHb2.png" 
        className="img-fluid col-md-5 float-md-end mb-5 ms-md-1  " alt="aboutus-img" />

      <div className="px-4 pt-0 pb-4 cover">
        <div className="reg-head">  
          <div className="aboutus-title text-white">Placebook</div>
        </div>
      </div>

      <div className="aboutus-text">
        <br></br>
        <p>A place to share travel memories</p>
        <p>All photography is important - it freezes memories.  It captures a moment in time to remember and cherish years from now.</p>
        <p>Tell your story by sharing your images with other like-minded placebookers to find and visit those magical destinations.</p>
        <p>Placebook not only allows users to upload images, it can pinpoint all the beautiful places in the world yet to be seen not only as a picture, but with an opportunity to visit on your future travels!</p>
        <p>Join us on our journey to connect one another, photography has no boundaries. Express yourself without any restrictions.</p>
        <div className="d-flex flex flex-row aboutus-gallery row justify-content-start gx-1 fluid">
          <div className="col-4">
            <button 
              className="card shadow rounded"
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal1">
              <img src="https://i.imgur.com/zEhltnDb.jpg" className="card-img-top" alt="rainbowsky"/>
              <div className="card-body p-3">
                <p className="md-card-text">Travel</p>
              </div>
            </button>
          </div>
          <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Rainbow Mountains</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src= "https://i.imgur.com/zEhltnD.jpg" width="100%" height="100%" className = "modal-img" alt="modal img" />
                </div>
              </div>
            </div>
          </div>
            
          <div className="col">
            <button 
              className="card shadow rounded" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal2">
              <img src="https://i.imgur.com/bYxhlZ0b.png" className="card-img-top" alt="girl" />
              <div className="card-body p-3">
                <p className="md-card-text">Capture</p>
              </div>
            </button>
          </div>

          <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Preserve those Cherished Memories</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src= "https://i.imgur.com/bYxhlZ0.png" width="100%" height="100%" className = "modal-img" alt="modal img" />
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <button
              className="card shadow rounded" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal3">
              <img src="https://i.imgur.com/PrLhxXeb.jpg" className="card-img-top" alt="noseehearspeak" />
              <div className="card-body p-3">
                <p className="md-card-text">Share</p>
              </div>
            </button>
          </div>
          <div className="modal fade" id="exampleModal3" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Mr Monopoly Street Art</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src= "https://i.imgur.com/PrLhxXe.jpg" width="100%" height="100%" className = "modal-img" alt="modal img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
  )
}
export default AboutUs