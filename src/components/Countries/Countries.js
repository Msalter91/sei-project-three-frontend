import React from 'react'

import { Link } from 'react-router-dom'
import Error from '../common/Error'
import { countriesGetAll } from '../../lib/api'

function Countries() {
  const [isError, setIsError] = React.useState(false)
  const [countries, setCountries] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(()=> {
    const getCountryData = async() => {
      try {
        const res = await countriesGetAll()
        setCountries(res.data) 
      } catch (err) {
        setIsError(true)
      }
    }
    getCountryData()
  },[])

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredCountries = (countries) => {
    
    return countries.filter(country => {
      return (
        country.name.toLowerCase().includes(searchValue.toLowerCase()) 
      )
    })
  }

  return (
    <>
      {isError ? (
        <Error />
      ) : (
        <div className="container">
          <div className="col-md-10 mx-auto">
            <div className="bg-white rounded overflow-hidden">
              <div className="pt-3 pb-2 cover mb-1">
                <div className="d-flex-body text-white">
                  <h3 className="title text-uppercase text-center">Inspiration for your next memory</h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="country-search mb-1">
                  <input
                    className="rounded"
                    placeholder="Search by country"
                    onChange={handleSearch}>
                  </input>
                </div>
              </div>
            </div>

            <div className="gy-2 row row-cols-3 country-stack">
              {
                countries && (
                  filteredCountries(countries).map(country=> {
                    return <div className="country-card-container"
                      key={country.name}>
                      <Link to={`/countries/${country._id}`}>
                        <div className="card country-card-main" style={{ backgroundImage: `url(${country.image})` }}>
                          <h5 className="my-auto image-covering-text">{country.name}</h5>
                        </div>
                      </Link>
                    </div>
                  })
                )
              }
            </div>
          </div>
        </div>
    
      )}
    </>
  )
}
export default Countries