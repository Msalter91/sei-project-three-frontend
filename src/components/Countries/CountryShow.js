import axios from 'axios'
import React from 'react'
import { logoImageLink } from '../../lib/config.js'
import { useParams, Link } from 'react-router-dom'

import Error from '../common/Error.js'

function CountryShow () {
  const { countryId } = useParams()

  const [country, setCountry] = React.useState(null)
  const [trips, setTrips] = React.useState(null)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    const getCountry = async () => {
      try {
        const countryData = await axios.get(`/api/countries/${countryId}`)
        setCountry(countryData.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getCountry()
  }, [countryId] )

  React.useEffect(() => {
    const getTrips = async () => {
      try {
        const tripData = await axios.get('/api/trips')
        setTrips(tripData.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getTrips()
  }, [countryId])

  console.log(trips)

  const countriesAndTrips = () => {
    if (country && trips) {
      return trips.filter((trip => {
        if (trips.countriesVisited) {
          return trip.countryVisited.toLowerCase() === country.name.toLowerCase()
        }
      }))
    } else {
      return 
    }
  }
  console.log(countriesAndTrips)

  return (
    <div className='container-fluid h-100'>
      {isError ? (
        <Error />
      ) :
        <><div className='row header-wrapper'>
          <div className='col'>
            <div className='header-splash-single'>
              <img src={country && country.image} />
            </div>
          </div>
        </div><div className='row country-info'>
          <div className='col info-container'>
            <h4>{country && country.name}</h4>
            <p>code: {country && country.countrycode}</p>
          </div>
          <div className='col info-container'>
            <h4>Languages</h4>
            <p>{country && country.language}</p>
          </div>
          <div className='col info-container'>
            <h4>Currency</h4>
            <p>{country && country.currency}</p>
          </div>
        </div>
        <div className="container pg-index">
          <div className="gy-2 row row-cols-3">
            
            {!countriesAndTrips() || !countriesAndTrips()[0] && 
            <Link  to={'/trips/new'}>
              <div className="card">
                <img className='' src={logoImageLink} alt="Card image cap"></img>
                <div className="card-body">
                  <h6 className="card-title">No adventures here yet!</h6>
                  <a href="#" className="btn btn-primary">Be the first to share their trip</a>
                </div>
              </div>
            </Link > 
            }
            {countriesAndTrips() && countriesAndTrips()[0] &&
                countriesAndTrips().map((trip => {
                  return (
                    <Link key={trip._id} to={`/trips/${trip._id}`}>
                      <div className="card">
                        <img className='' src={trip.memories[0] ? trip.memories[0].image : 'https://static.toiimg.com/thumb/66440952/road-trip.jpg?width=1200&height=900'} alt="Card image cap"></img>
                        <div className="card-body">
                          <h6 className="card-title">{trip.title}</h6>
                          <a href="#" className="btn btn-primary">See their trip</a>
                        </div>
                      </div>
                    </Link >
                  )
                }
                ))}
          </div>
        </div>
        
        </>
    
    
      }
      
    </div>
  )

}

export default CountryShow
