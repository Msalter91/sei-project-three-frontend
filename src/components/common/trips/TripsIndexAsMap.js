import { useEffect, useState } from 'react'
import { getAllTrips } from '../../../lib/api'
import Error from '../Error'
import RenderMap from '../maps/RenderMap'

function TripsIndexAsMap () {
  const [tripList, setTripList] = useState([])
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
    const getTripList = async()=>{
      try {
        const res = await getAllTrips()
        setTripList(res.data)
      } catch (err){
        setIsError(true)
      }
    } 
    getTripList()
  }, [])

  console.log(tripList)
  return (
    <section className="section row">
      {isError ? (
        <Error />
      ) : (
        <div className='index-map-container col' style={{ height: 500 }}>
          <RenderMap arrayOfTrips={tripList}/>
        </div>
      )}
    </section>
  )
}

export default TripsIndexAsMap