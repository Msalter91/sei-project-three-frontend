import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const dummyCountry = {
  name: 'Algeria',
  countrycode: 'DZA',
  image: 'https://nbc-2.com/wp-content/uploads/2021/06/oran.jpg',
  summary: 'Algeria, officially the People\'s Democratic Republic of Algeria, is a ...',
  language: 'Arabic',
  currency: 'Dinar',
  trips: [],
}

function CountryShow () {
  const { countryId } = useParams()

  const [country, setCountry] = React.useState(null)

  React.useEffect(() => {
    const getCountry = async () => {
      try {
        const countryData = await axios.get(`/api/countries/${countryId}`)
        setCountry(countryData)
      } catch (err) {
        console.log(err)
      }
    }
    getCountry()
  }, [countryId] )
  console.log(country)

  return (
    <div className='container-fluid h-100' style={{ border: '1px solid red' }}>
      <div className='row header-wrapper'style={{ border: '1px solid green' }}>
        <div className='col'>
          <div className='header-splash-single'>
            <img src={dummyCountry.image}/>
          </div>
        </div>
      </div>
      <div className='row country-info' style={{ border: '1px solid black' }}>
        <div className='col info-container'>
          <h4>{dummyCountry.name}</h4>
          <p>code: {dummyCountry.countrycode}</p>
        </div>
        <div className='col info-container'>
          <h4>Languages</h4>
          <p>{dummyCountry.language}</p>
        </div>
        <div className='col info-container'>
          <h4>Currency</h4>
          <p>{dummyCountry.currency}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {!dummyCountry.trips[0] && <p>Looks like there are no adventures here yet</p> }
          {dummyCountry.trips[0] && <p>This is where cards would go that are full of images</p>}
        </div>
      </div>
    </div>
  )

}

export default CountryShow
