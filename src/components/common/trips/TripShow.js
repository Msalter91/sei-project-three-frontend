import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { tripGetById } from '../../../lib/api.js'
import Error from '../Error.js'

import RenderMap from '../maps/RenderMap.js'
import MemorySmall from '../memories/MemorySmall.js'

const initialState = {
  title: '',
  notes: '',
  countryVisited: '',
  dateStarted: '',
  dateFinished: '',
  memories: [],
}

function TripShow () {
  const [tripData, setTripData] = useState(initialState)
  const [isError, setIsError] = useState(false)
  const { tripId } = useParams()

  useEffect(()=>{
    const fetchTripData = async () => {
      try {

        const fetchTripRes = await tripGetById(tripId)
        setTripData(fetchTripRes.data)
      } catch (err){
        setIsError(true)
      } 
    }
    fetchTripData()
  }, [tripId])

  return (
    <section className='section'>
      {isError ? (
        <Error />
      ) : (
        <div className='container-fluid row'>
          <div className='col-4'>
            <h2>{tripData.title}</h2>
            <h3>{tripData.countryVisited}</h3>
            <p>{tripData.notes}</p>
            <div className='edit-trip-map-container'>
              <RenderMap arrayOfTrips={[tripData]}/>
            </div>
          </div>
          <div 
            className="col"
            style={{ background: 'khaki' }}>
            <div 
              className='d-flex flex-column'>
            </div>
            <div className='custom-memories-container row'>
              {Boolean(tripData.memories.length) && tripData.memories.map(
                memory => <MemorySmall key={memory._id} memory={memory} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TripShow