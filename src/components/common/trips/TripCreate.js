import React from 'react'

import RenderMap from '../maps/RenderMap'

const maxLengthTitle = 50
const maxLengthNotes = 300
const initialState = {
  title: '',
  notes: '',
  countryVisited: '',
  dateStarted: '',
  dateFinished: '',
  memories: [],
}

function TripCreate () {
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  
  const handleChange = e =>{
    const value = e.target.value
    setFormData({ ...formData, [e.target.name]: value })
    console.log(formData)
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
  }

  return (
    <section className="section">
      <form
        className="container-fluid row"
        onSubmit={handleSubmit}
      >
        <div className="col-7" 
          style={{ background: 'antiquewhite' }}>
          <div className="form-group">
            <label htmlFor="title"></label>
            <input 
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="countryVisited">Where did you start?</label>
            <input 
              type="text" 
              name="countryVisited"
              id="countryVisited"
              className="form-control"
              value={formData.countryVisited}
              onChange={handleChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Tell the world about your trip!</label>
            <textarea 
              name="notes"
              id="notes"
              className="form-control"
              value={formData.notes}
              onChange={handleChange} />
            <div className='row'>
              <small className="form-text text-muted ml-auto text-end">{maxLengthNotes - formData.notes.length} characters remaining</small>
            </div>
          </div>
          <div>
            <RenderMap />
          </div>
        </div>
        <div className="col d-flex flex-column"
          style={{ background: 'khaki' }}>
          {/* TODO: create memory component */}
          {/* TODO: add new create memory component */}
        </div>
        <div className='row'>
          <button 
            type="submit"
            className="btn btn-success ml-auto"
          >Save your trip</button>
        </div>
      </form>
    </section>
  )
}

export default TripCreate