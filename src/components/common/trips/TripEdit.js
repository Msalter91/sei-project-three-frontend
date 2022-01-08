import React from 'react'
import { tripGetById, tripEdit } from '../../../lib/api'
import { useParams } from 'react-router-dom'

import RenderMap from '../maps/RenderMap'
import Error from '../Error'
import MemoryCreate from '../memories/MemoryCreate'

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

function TripEdit () {
  const [formData, setFormData] = React.useState(initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = React.useState(initialState)
  const { tripId } = useParams()
  const [isError, setIsError] = React.useState(false)

  // populate initial data

  React.useEffect(()=>{
    (async ()=>{
      try {
        const getTripRes = await tripGetById(tripId)
        const newFormData = { ...formData,...getTripRes.data }
        setFormData(newFormData)
      } catch (err){
        setIsError(true)
      }
    })()
    // Do NOT want this hook to re-render on formData change, therefore accept non-exhaustive dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripId])
  
  const handleChange = e =>{
    const value = e.target.value
    // if user is editing title field and exceeds length, do not accept new characters.
    if (
      e.target.name === 'title' &&
      e.target.value.length > maxLengthTitle
    ) {
      return
    }
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      const res = await tripEdit(tripId, formData)
      console.log('Editing return:',res)
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }
  return (
    <section className="section">
      {isError ? (
        <Error />
      ) : (
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
                className={
                  `form-control ${formErrors.countryVisited ? 'border-danger' : ''}`}
                value={formData.title}
                onChange={handleChange}
              />
              {formErrors.title && <p className="text-danger">{formErrors.title}</p>  }
            </div>
            <div className="form-group">
              <label htmlFor="countryVisited">Where did you start?</label>
              <input 
                type="text" 
                name="countryVisited"
                id="countryVisited"
                className={
                  `form-control ${formErrors.countryVisited ? 'border-danger' : ''}`}
                value={formData.countryVisited}
                onChange={handleChange} 
              />
              {formErrors.countryVisited && <p className="text-danger">{formErrors.countryVisited}</p>  }
            </div>
            <div className="form-group">
              <label htmlFor="notes">Tell the world about your trip!</label>
              <textarea 
                name="notes"
                id="notes"
                className={
                  `form-control 
                ${(notesRemainingChars < 0 ||
                  formErrors.notes ) ? 'border-danger' : ''}`}
                value={formData.notes}
                onChange={handleChange} />
              <div className='row'>
                <small 
                  className={`form-text ml-auto text-end ${
                    (notesRemainingChars < 0) ? 'text-danger' : 'text-muted'
                  }`}
                >{notesRemainingChars} characters remaining</small>
              </div>
              {formErrors.notes && <p className="text-danger">{formErrors.notes}</p>  }
            </div>
            <div>
              <RenderMap />
            </div>
          </div>
          <div 
            className="col d-flex flex-column"
            style={{ background: 'khaki' }}>
            <MemoryCreate />
            <MemoryCreate />
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
      )}
    </section>
  )
}

export default TripEdit