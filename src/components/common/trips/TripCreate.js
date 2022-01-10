import { useHistory } from 'react-router-dom'
import { tripPostNewTrip } from '../../../lib/api'
import { isAuthenticated } from '../../../lib/auth'

function TripCreate(){
  const history = useHistory()

  //TODO : convert next line to PrivateRoute component
  if (!isAuthenticated()) history.push('/login')

  const getNewTripId = async () => {
    const res = await tripPostNewTrip()
    history.push(`/trips/${res.data._id}/edit`)
  }
  getNewTripId()
  return (
    <h1>Creating your trip...</h1>
  )
}

export default TripCreate