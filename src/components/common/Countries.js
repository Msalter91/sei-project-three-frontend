import React from 'react'
import axios from 'axios'

function Countries() {

  const [countries, setCountries] = React.useState(null)

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

  console.log(countries)
  
  return (
    <div className="countries">
      <h1>INSPIRE ME / COUNTRIES PAGE</h1>
    </div>
  )
}
export default Countries