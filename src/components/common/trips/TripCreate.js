import { useHistory } from 'react-router-dom'
import { tripCreate } from '../../../lib/api'

function TripCreate(){
  const history = useHistory()

  const getNewTripId = async () => {
    const res = await tripCreate()
    history.push(`/trips/${res.data._id}/edit`)
  }
  getNewTripId()
  return (
    <h1>Creating your trip...</h1>
  )
}

export default TripCreate