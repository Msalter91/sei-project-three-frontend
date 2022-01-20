import { useState } from 'react'

import { memoryDelete, memoryEdit } from '../../../../lib/api.js'
import { buttonStyle } from '../../../../lib/bootstrap-css-config.js'
import { logoImageLink } from '../../../../config.js'
import { uploadImageMemory } from '../../../../lib/imageHosting.js'
import IconBin from '../../../Assets/IconBin.js'
import LocationPicker from '../../maps/LocationPicker.js'
import Error from '../../Error.js'
import { logInDevelopment } from '../../../../lib/helpers.js'


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


function MemoryEdit ({ memory, handleSwitchToShow, updateClientsideMemory }) {
  const [formData, setFormData] = useState(memory ? memory : initialState)
  const notesRemainingChars = maxLengthNotes - formData.notes.length
  const [formErrors, setFormErrors] = useState({ ...initialState, visitDate: 0 })
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [isError, setIsError] = useState(false)
  
  const handleChange = e =>{
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      await memoryEdit(memory._id, formData)
      // update client without re-fetching
      updateClientsideMemory(formData)
      handleSwitchToShow()
    } catch (err) {
      //todo: if more serious error, then show error component or bounce to login
      logInDevelopment(err)
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUpload = async (e) => {
    try {
      setIsUploadingImage(true)
      const newImageUrl = await uploadImageMemory(e.target.files[0])
      setFormData({ ...formData, image: newImageUrl })
      setIsUploadingImage(false)
    } catch (err) {
      logInDevelopment(err)
      setIsUploadingImage(false)
    }
  }
  const handleDeleteMemory = async () =>{
    try {
      await memoryDelete(formData._id)
      updateClientsideMemory({})
    } catch (err) {
      setIsError(true)
    }
  }

  const captureLocation = (location) => {
    setFormData({ ...formData, ...location  })
  }

  return (
    <form 
      className="container-fluid row placebook-form"
      onSubmit={handleSubmit}>
      {isError ? <Error /> : (
        <>
          <div className='row'>
            <div className="form-group col">
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
            <div className="form-group col">
              <label htmlFor="location">Where were you?</label>
              <input
                type='text' 
                name="location"
                id="location"
                className={
                  `form-control 
                ${(formErrors.location ) ? 'border-danger' : ''}
                `}
                value={formData.location}
                onChange={handleChange} />
              {formErrors.location && <p className="text-danger">{formErrors.location}</p>  }
              <LocationPicker captureLocation={captureLocation} />
            </div>
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
          <div className='row'>
            {isUploadingImage && <p>Image uploading...</p>}
            <button 
              type="submit"
              className={`btn ${buttonStyle.default} ml-auto col ${isUploadingImage && 'disabled'}`}
              aria-disabled={isUploadingImage}
            >Save this memory!</button>
            <button 
              type="button"
              className={`btn w-fit ${buttonStyle.danger} col ${isUploadingImage && 'disabled'}`}
              aria-disabled={isUploadingImage}
              onClick={handleDeleteMemory}
            ><IconBin /></button>
          </div>
        </>
      )}
    </form>
  )
}

export default MemoryEdit