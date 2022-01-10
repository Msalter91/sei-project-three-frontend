import { useState } from 'react'
import axios from 'axios'

import { memoryCreate } from '../../../lib/api.js'
import { logoImageLink } from '../../../lib/config.js'
import RenderMap from '../maps/RenderMap.js'


const initialState = {
  name: 'A beautiful day',
  location: '<location picker here>',
  image: '',
  notes: '',
  lat: 0,
  long: 0,
  visitDate: new Date(),
}
const maxLengthNotes = 200


function MemoryCreate ({ tripId, addNewMemoryToTrip, toggleCreateMemoryForm }) {
  const [formData, setFormData] = useState(initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState({ initialState, name: '', location: '' , visitDate: 0, image: '' })
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    console.log('submitting:', { ...formData, pairedTrip: tripId })
    try {
      const res = await memoryCreate({ ...formData, pairedTrip: tripId })
      const newMemoryId = res.data._id
      await addNewMemoryToTrip(newMemoryId)
      toggleCreateMemoryForm()
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  // Cloudinary
  const handleImageUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_MEMORY)
    setIsUploadingImage(true)
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    setFormData({ ...formData, image: res.data.url })
    setIsUploadingImage(false)
  }

  // Map information 
  const captureLocation = (location) => {
    setFormData({ ...formData, long: location[0], lat: location[1] })
  }

  return (

    <form 
      className="container-fluid row"
      onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="label" htmlFor="image" role="button">
          <p>Share a photo?</p>
          <img 
            src={formData.image ? formData.image : logoImageLink} 
            alt={formData.name} 
            className='memory-edit-image' 
          />
        </label>
        <input 
          type="file" 
          className='d-none'
          id="image" 
          accept="image/png, image/jpeg"
          onChange={handleImageUpload} 
        />
        {isUploadingImage && <p>Image uploading</p>}
      </div>
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
        <RenderMap getLocationFromMap={captureLocation} />
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
      {/* </div> */}
      <div className='row'>
        {isUploadingImage && <p>Image uploading...</p>}
        <button 
          type="submit"
          className={`btn btn-success ml-auto ${isUploadingImage && 'disabled'}`}
          aria-disabled={isUploadingImage}
        >Save this memory!</button>
      </div>
    </form>
  )
}

export default MemoryCreate