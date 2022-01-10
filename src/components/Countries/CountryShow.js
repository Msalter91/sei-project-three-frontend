import axios from 'axios'
import React from 'react'
import { useParams, Link } from 'react-router-dom'

function CountryShow () {
  const { countryId } = useParams()

  const [country, setCountry] = React.useState(null)
  const [trips, setTrips] = React.useState(null)

  React.useEffect(() => {
    const getCountry = async () => {
      try {
        const countryData = await axios.get(`/api/countries/${countryId}`)
        setCountry(countryData.data)
      } catch (err) {
        console.log(err)
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
        console.log(err)
      }
    }
    getTrips()
  }, [countryId])

  console.log(trips)

  const countriesAndTrips = () => {
    if (country && trips) {
      return trips.filter((trip => {
        return trip.countryVisited.toLowerCase() === country.name.toLowerCase()
      }))
    } else {
      return 
    }
  }
  console.log(countriesAndTrips)

  return (
    <div className='container-fluid h-100' style={{ border: '1px solid red' }}>
      <div className='row header-wrapper'style={{ border: '1px solid green' }}>
        <div className='col'>
          <div className='header-splash-single'>
            <img src={country && country.image}/>
          </div>
        </div>
      </div>
      <div className='row country-info' style={{ border: '1px solid black' }}>
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
      <div className='row'>
        <div className='col'>
          {!countriesAndTrips() || !countriesAndTrips()[0] && <p>Looks like there are no adventures here yet</p> }
          {countriesAndTrips() && countriesAndTrips()[0] && 
          countriesAndTrips().map((trip => {
            return (
              <div className='col-3' key={trip.name}>
                <Link to={`/trips/${trip._id}`}>
                  <div className="card">
                    <img className='' src={trip.memories[0] ? trip.memories[0].image : 'https://static.toiimg.com/thumb/66440952/road-trip.jpg?width=1200&height=900'} alt="Card image cap"></ img>
                    <div className="card-body">
                      <h6 className="card-title">{trip.title}</h6>
                      <a href="#" className="btn btn-primary">See their trip</a>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
          ))}
        </div>
      </div>
    </div>
  )

}

export default CountryShow
