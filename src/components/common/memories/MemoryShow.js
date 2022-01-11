import axios from 'axios'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

function MemoryShow () {
  const { memoryId } = useParams()

  const [memory, setMemory] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [trip, setTrip] = React.useState(null)

  React.useEffect(() => {
    const getMemory = async () => {
      try {
        const memoryData = await axios.get(`/api/memories/${memoryId}`)
        setMemory(memoryData.data)
        setUser(memoryData.data.addedBy)
        setTrip(memoryData.data.pairedTrip)
      } catch (err) {
        console.log(err)
      }
    }
    getMemory()
  }, [memoryId] )

  const readableTime = new Date(Date.parse(memory ? memory.created_at : 1)).toLocaleString()

  console.log(trip)

  return (

    <div className="row py-4 px-4">
      <div className="col-md-5 mx-auto">

        {/* <!-- Profile widget --> */}

        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="d-flex align-items-end profile-head">
              <div className="profile mr-3"><img src={user && user.image} alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
              </div>

              <div className="d-flex-body mb-5 text-white">
                <h4 className="memsname text-uppercase mt-0 mb-0 ms-3">{user && user.displayName}</h4>
                <p className="memslocation text-capitalize small mb-4">
                  <i className="fas fa-map-marker-alt mr-2 ms-3"></i>{user && user.location}</p>
              </div>
            </div>
          </div>
          <ul className="list-inline mb-0">
            <br></br><br></br>

          </ul>

          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">

              
              <div className="fluid h-100">
                {memory &&
          <div className="fluid">
            {/* <div className="row"> */}
            <div className="memstitle gy-1 row row-col text-wrap text-center text-capitalize">
              <h2>{memory && memory.name}</h2>
              <img src={memory && memory.image}/>
            </div>

            {/* </div> */}
          
            <div className="p-3 rounded shadow-sm bg-light">
              <div className="row memory-info-holder">
                
                {trip && (
                  <div className="col-sm-4">
                    <p>Part of <Link to={`/trips/${trip._id}`}>
                      {trip.title}
                    </Link></p>
                  </div>
                )}
                
                <div className="col-sm-8">
                  <p>Added on {memory && readableTime} </p>
                </div>
              </div>
            </div>
            <br></br>
            <div className="p-3 rounded shadow-sm bg-light">
              <div className="row text-wrap text-center">
                <div className="col-sm-12">
                  <p>{memory && memory.location}</p>
                  <p>{memory && memory.notes}</p>
                </div>
              </div>

            </div>
          </div>}
              </div>
            </div>
            <button>
              <Link to={trip ? `/trips/${trip._id}/edit` : '/'}
                className="btn btn-outline-info btn-sm d-flex justify-content-center">
                  Edit / Delete Memory</Link>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default MemoryShow

//ORIGINAL MEMORY SHOW CODE**********************
// import axios from 'axios'
// import React from 'react'
// import { useParams } from 'react-router-dom'

// function MemoryShow () {
//   const { memoryId } = useParams()

//   const [memory, setMemory] = React.useState(null)

//   React.useEffect(() => {
//     const getMemory = async () => {
//       try {
//         const memoryData = await axios.get(`/api/memories/${memoryId}`)
//         setMemory(memoryData.data)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     getMemory()
//   }, [memoryId] )
//   console.log(memory)

//   return (
//     <div className='container-fluid h-100' style={{ border: '1px solid red' }}>
//       {memory &&
//     <div className='container-fluid memory-wrapper'>
//       <div className='row'>
//         <div className='col memory-image-holder'>
//           <h2>{memory.name}</h2>
//           <img src={memory.image} />
//         </div>
//       </div>
//       <div className='row memory-info-holder'>
//         <div className='col-sm-4' style={{ border: '1px solid blue' }}>
//           <p>part of Trip</p>
//         </div>
//         <div className='col-sm-8' style={{ border: '1px solid blue' }}>
//           <p>Added on {memory.created_at}</p>
//         </div>
//       </div>
//       <div className='row'>
//         <div className='col-sm-12'>
//           <p>{memory.location}</p>
//           <p>{memory.notes}</p>
//         </div>

//       </div>
//     </div>
//       }   
//     </div>
//   )
// }
// export default MemoryShow
