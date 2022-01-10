import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

function MemoryShow () {
  const { memoryId } = useParams()

  const [memory, setMemory] = React.useState(null)

  React.useEffect(() => {
    const getMemory = async () => {
      try {
        const memoryData = await axios.get(`/api/memories/${memoryId}`)
        setMemory(memoryData.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMemory()
  }, [memoryId] )
  console.log(memory)

  return (

    <div className="row py-5 px-4">
      <div className="col-md-6 mx-auto">

        {/* <!-- Profile widget --> */}

        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="d-flex align-items-end profile-head">
              <div className="profile mr-3"><img src="https://i.imgur.com/bEYsXdQ.jpg?1" alt="..." width="150" className="rounded mb-2 img-thumbnail"/>              
              </div>

              <div className="d-flex-body mb-5 text-white">
                <h4 className="mt-0 mb-0 ms-3">NAME</h4>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt mr-2 ms-3"></i>LOCATION</p>
              </div>
            </div>
          </div>
          <ul className="list-inline mb-0">
            <br></br><br></br>

          </ul>
          <div className="px-5 py-1">
          </div>
          <div className="py-1 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">

              
              <div className='container-fluid h-100'>
                {memory &&
          <div className='container-fluid memory-wrapper'>
            {/* <div className='row'> */}
            <div className='col memory-image-holder'>
              <h2>{memory.name}</h2>
              <img src={memory.image} />
            </div>
            {/* </div> */}
          
            <div className="p-3 rounded shadow-sm bg-light">
              <div className='row memory-info-holder'>
                <div className='col-sm-4'>
                  <p>part of Trip</p>
                </div>
                <div className='col-sm-8'>
                  <p>Added on {memory.created_at}</p>
                </div>
              </div>
            </div>
            <br></br>
            <div className="p-3 rounded shadow-sm bg-light">
              <div className='row text-center'>
                <div className='col-sm-12'>
                  <p>{memory.location}</p>
                  <p>{memory.notes}</p>
                </div>
              </div>

            </div>
          </div>}
              </div>
            </div>
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
