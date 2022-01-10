import React from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

function Countries() {
  
  const [countries, setCountries] = React.useState(null)
  const [searchValue, setSearchValue] = React.useState('')

  React.useEffect(()=> {
    const getCountryData = async() => {
      try {
        const countryData = await axios.get('api/countries')
        setCountries(countryData.data) 
      } catch (err) {
        console.log(err)
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
    <div className='container-fluid h-100' style={{ border: '1px solid red' }}>
      <div className='row header-wrapper'style={{ border: '1px solid green' }}>
        <div className='col'>
          <div className='header-splash'>
            <h2>Inspiration for your next memory</h2>
          </div>
        </div>
      </div>
      <div className='row' style={{ border: '1px solid blue' }}>
        <div className='col'>
          <div className='country-search'>
            <input
              placeholder='Search by country'
              onChange={handleSearch}
            >
            </input>
          </div>
        </div>
      </div>
      <div className=' row card-container' style={{ border: '1px solid black' }}>
        {
          countries && (
            filteredCountries(countries).map(country=> {
              return <div className='col-3' key={country.name}>
                <Link to={`/countries/${country._id}`}>
                  <div className="card">
                    <img className='' src={country.image} alt="Card image cap"></ img>
                    <div className="card-body">
                      <h6 className="card-title">{country.name}</h6>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </Link>
              </div>
            })
          )
        }
      </div>
    </div>
  )
}
export default Countries