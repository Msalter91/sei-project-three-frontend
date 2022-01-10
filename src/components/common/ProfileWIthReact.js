import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

import React from 'react'
import { getUserId } from '../../lib/auth'


function Profile() {

  const userId = useParams()

  const [user, setUser] = React.useState(null)
  const [memories, setMemories] = React.useState(null)

  React.useEffect( ()=>{
    const getUser = async () => {
      try {
        const userData = await axios.get(`/api/profile/${getUserId()}`)
        setUser(userData.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [userId] )

  React.useEffect( ()=>{
    const getMemories = async () => {
      try {
        const memoryData = await axios.get('/api/memories')
        const memoryArray = memoryData.data.filter(memory => memory.addedBy === getUserId())
        setMemories(memoryArray)
      } catch (err) {
        console.log(err)
      }
    }
    getMemories()
  }, [userId] )

  console.log(memories)

  return (
    <div className="row py-5 px-4">
      <div className="col-md-7 mx-auto">
    
        {/* <!-- Profile widget --> */}
    
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="d-flex align-items-end profile-head">
              <div className="profile mr-3"><img src="https://i.imgur.com/4zrA1gBb.jpg" alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
              </div>


              <div className="d-flex-body mb-5 text-white">
                <h4 className="mt-0 mb-0 ms-3">{user && user.displayName}</h4>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt mr-2 ms-3"></i>{user && user.location}</p>
              </div>
            </div>
          </div>
          <div className="bg-light p-3 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{user && user.memories.length}</h5><small className="text-muted"> <i className="fas fa-image mr-1"></i>Memories</small>
              </li>
              
            </ul>
          </div>
          <div className="px-5 py-1">
            <h5 className="mb-0">About</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0"> {user && user.about}</p>
              <button>
                <Link to={`/profile/${getUserId()}/edit`} className="btn btn-outline-info btn-sm">Edit Profile</Link>
              </button>
            </div>
          </div>
          <div className="py-1 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0 ms-4">Recent Memories</h5>
              {/* <a href="#" className="btn btn-link text-muted">Show all</a> */}
              <button>
                <Link to={`/trips/${getUserId()}/edit`} className="btn btn-outline-info btn-sm me-3">Create New Memory</Link>
              </button>

            </div>
            <div className="container pg-index">
              <div className="gy-2 row row-cols-3">
                {memories && memories.map((memory => {
                  return (
                    <Link key={memory._id} to={`/memories/${memory._id}`} >
                      <div className="profileImgGal col-lg-12 mb-2 pr-lg-1">
                        <img src={memory.image} alt="" className="img-fluid rounded shadow-sm"/>
                      </div> 
                    </Link>
                  )
                }))}
              </div>
            </div> 
          </div>

        </div>
      </div>
    </div>
    
  )
}
    
export default Profile
