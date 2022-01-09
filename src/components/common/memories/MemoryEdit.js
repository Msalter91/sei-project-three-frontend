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


function MemoryEdit (memory) {
  console.log('edit: ',memory)
  const [formData, setFormData] = useState(initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState(memory ? memory : initialState)
  
  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', formData)
    try {
      const res = await memoryEdit(memory._id, formData)
      console.log('Editing return:',res)
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
    </form>
  )
}

export default MemoryEdit