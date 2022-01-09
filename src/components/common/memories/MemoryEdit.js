import { useState } from 'react'

import { memoryEdit } from '../../../lib/api.js'


const initialState = {
  name: '',
  location: '',
  image: '',
  notes: '',
  lat: 0,
  long: 0,
  visitDate: new Date(),
}
const maxLengthNotes = 200


function MemoryEdit ({ memory, handleSwitchToShow }) {
  console.log('edit: ',memory)
  const [formData, setFormData] = useState(memory ? memory : initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState({ ...initialState, visitDate: 0 })
  
  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      const res = await memoryEdit(memory._id, formData)
      console.log('Editing return:',res)
      handleSwitchToShow()
    } catch (err) {
      console.log('error response:', err.res)
      setFormErrors(err.response.data.errors)
    }
  }

  return (
    <form 
      className="container-fluid row"
      onSubmit={handleSubmit}
    >
      <div className='col'>
        <div className="form-group">
          <label htmlFor="image">Share a photo?</label>
          <input
            type='text' 
            name="image"
            id="image"
            className={
              `form-control 
                ${(formErrors.image ) ? 'border-danger' : ''}
                `}
            value={formData.image}
            onChange={handleChange} />
          {formErrors.image && <p className="text-danger">{formErrors.image}</p>  }
        </div>
        <figure className="image">
          <img src={formData.image} alt={formData.name} className='memory-edit-image' />
        </figure>
      </div>
      <div className='col'>
        <div className="form-group">
          <label htmlFor="name">What happened?</label>
          <input
            type='text' 
            name="name"
            id="name"
            className={
              `form-control 
                ${(formErrors.name ) ? 'border-danger' : ''}
                `}
            value={formData.name}
            onChange={handleChange} />
          {formErrors.name && <p className="text-danger">{formErrors.name}</p>  }
        </div>
        <div className="form-group">
          <label htmlFor="location">Where were you?</label>
          <input
            type='text' 
            name="location"
            id="location"
            className={
              `form-control 
                ${(formErrors.name ) ? 'border-danger' : ''}
                `}
            value={formData.location}
            onChange={handleChange} />
          {formErrors.location && <p className="text-danger">{formErrors.location}</p>  }
        </div>
        <div className="form-group">
          <label htmlFor="lat">LATITUDE</label>
          <input
            type='number' 
            name="lat"
            id="lat"
            className={
              `form-control 
                ${(formErrors.lat ) ? 'border-danger' : ''}
                `}
            value={formData.lat}
            onChange={handleChange} />
          {formErrors.lat && <p className="text-danger">{formErrors.lat}</p>  }
        </div>
        <div className="form-group">
          <label htmlFor="long">LONGITUDE</label>
          <input
            type='number' 
            name="long"
            id="long"
            className={
              `form-control 
                ${(formErrors.long ) ? 'border-danger' : ''}
                `}
            value={formData.long}
            onChange={handleChange} />
          {formErrors.long && <p className="text-danger">{formErrors.long}</p>  }
        </div>
        <div className="form-group">
          <label htmlFor="visitDate">When were you there?</label>
          <input
            type='date' 
            name="visitDate"
            id="visitDate"
            className={
              `form-control 
                ${(formErrors.visitDate ) ? 'border-danger' : ''}
                `}
            value={formData.visitDate}
            onChange={handleChange} />
          {Boolean(formErrors.visitDate) && <p className="text-danger">{formErrors.visitDate}</p>  }
        </div>
        <div className="form-group">
          <label htmlFor="notes">What did you love?</label>
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
      </div>
      <div className='row'>
        <button 
          type="submit"
          className="btn btn-success ml-auto"
        >Save this memory!</button>
      </div>
    </form>
  )
}

export default MemoryEdit