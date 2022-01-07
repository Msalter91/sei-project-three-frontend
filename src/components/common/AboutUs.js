function AboutUs() {
  return (
    <div className="aboutus-bg clearfix">
      <img src="https://i.imgur.com/LpuXLvR.png" 
        className="img-fluid history-img col-md-5 float-md-end mb-5 ms-md-1 " alt="aboutus-img" />

      <div className="aboutus-text">
        <h2>Placebook</h2>
        <p>A place to share travel memories</p>
        <p>All photography is important - it freezes memories.  It captures a moment in time to remember and cherish years from now.</p>
        <p>Tell your story by sharing your images with other like-minded placebookers to find and visit those magical destinations.</p>
        <p>Placebook not only allows users to upload images, it can pinpoint all the beautiful places in the world yet to be seen not only as a picture, but with an opportunity to visit on your future travels!</p>
        <p>Join us on our journey to connect one another, photography has no boundaries. Express yourself without any restrictions.</p>

        <div className="aboutus-gallery row justify-content-start gx-1">

          <div className="col">
            <button 
              className="card shadow mb-5 bg-body rounded"
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal1">
              <img src="https://i.imgur.com/lvnxDH2b.png" className="card-img-top" alt="girl"/>
              <div className="card-body">
                <p className="card-text"></p>
              </div>
            </button>
          </div>

          <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Beautiful Expression</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src= "https://i.imgur.com/lvnxDH2.png" width="100%" height="100%" className = "modal-img" alt="modal img" />
                </div>
              </div>
            </div>
          </div>
            
          <div className="col">
            <button 
              className="card shadow mb-2 bg-body rounded" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal2">
              <img src="https://i.imgur.com/0uSsBhgb.png?1" className="card-img-top" alt="beach" />
              <div className="card-body">
                <p className="card-text"></p>
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
                  <img src= "https://i.imgur.com/0uSsBhg.png" width="100%" height="100%" className = "modal-img" alt="modal img" />
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <button
              className="card shadow mb-2 bg-body rounded" 
              data-bs-toggle="modal" 
              data-bs-target="#exampleModal3">
              <img src="https://i.imgur.com/WVq88Eqb.png?1" className="card-img-top" alt="puppy" />
              <div className="card-body">
                <p className="card-text"></p>
              </div>
            </button>
          </div>

          <div className="modal fade" id="exampleModal3" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Capture Precious Moments</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  
                </div>
                <div className="modal-body">
                  <img src= "https://i.imgur.com/WVq88Eq.png" width="100%" height="100%" className = "modal-img" alt="modal img" />
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