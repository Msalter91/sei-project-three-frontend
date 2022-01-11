import { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { tripPostNewTrip } from '../../../lib/api'
import { isAuthenticated } from '../../../lib/auth'
import Error from '../Error'

function TripCreate(){
  const history = useHistory()
  const [isError, setIsError] = useState(false)

  //TODO : convert next line to PrivateRoute component
  const bounceToLogin = () =>{
    history.push('/login')
  }
  if (!isAuthenticated()) {
    bounceToLogin()
  }

  const getNewTripId = async () => {
    try {
      const res = await tripPostNewTrip()
      history.push(`/trips/${res.data._id}/edit`)
    } catch (err) {
      setIsError(true)
      //todo: only bounce on 401?
      bounceToLogin()
    }
  }
  getNewTripId()
  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <h1>Creating your trip...</h1>
      )}
    </>
  )
}

export default TripCreate