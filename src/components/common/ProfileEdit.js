import React, { useState } from 'react'
import Select from 'react-select'

import Error from './Error'

import { getUserId } from '../../lib/auth'
import { makeCountryObject } from '../../lib/countryData.js'
import { editUser, getUserProfile } from '../../lib/api'
import { useHistory } from 'react-router-dom'
import { uploadImageProfile } from '../../lib/imageHosting'
import { profileImageLink } from '../../config'
import { buttonStyle } from '../../lib/bootstrap-css-config'

const initialState = {
  displayName: '',
  email: '',
  firstName: '',
  surname: '',
  about: '',
  location: '',
  image: '',
}

function ProfileEdit() {
  console.log('edit')
  const history = useHistory()
  const userId = getUserId()
  const [countryValue, setCountryValue] = useState({
    value: '',
    label: '' })
  const [formData, setFormData] = React.useState(initialState)
  // const [user, setUser] = React.useState(null)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const [isError, setIsError] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = React.useState(false)

  const countryOptions = makeCountryObject()

  const changeCountryHandler = value => {
    setCountryValue(value)
    setFormData({ ...formData, location: value.label })
  }

  React.useEffect( ()=>{
    const getUser = async () => {
      try {
        const res = await getUserProfile('')
        setFormData(formData=>({ ...formData, ...res.data }))
        res.data.location && setCountryValue( { label: res.data.location, value: res.data.location })
      } catch (err) {
        setIsError(true)
      }
    }
    getUser()
  }, [])
  
  
  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await editUser(formData, userId)
      history.push('/profile')
    } catch (err) {
      setFormErrors(err.response.data.errors)
    }
  }

  const handleImageUpload = async (e) => {
    try {
      setIsUploadingImage(true)
      const newImageUrl = await uploadImageProfile(e.target.files[0])
      setFormData({ ...formData, image: newImageUrl })
      setIsUploadingImage(false)
    } catch (err) {
      setIsUploadingImage(false)
    }
  }

  return (
    <main className="section profileEdit">
      {isError ? (
        <Error />
      ) : (
        <div className="col">
          <div className="card mx-auto mb-5 shadow-sm mb-2 bg-body rounded col">
          
            <form onSubmit={handleSubmit}>

              <div className="field">
                <label className="label">Display Name</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder={formData.displayName}
                    name="displayName"
                    id="displayName"
                    disabled= {true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    placeholder={formData.email}
                    name="email"
                    id="email"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.firstName && 'is-danger'}`}
                    placeholder="Enter First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className={`input ${formErrors.lastName && 'is-danger'}`}
                    placeholder="Enter Last Name"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Country</label>
                <div className="control">
                  <Select options={countryOptions} value={countryValue} onChange={changeCountryHandler}/>
                </div>
              </div>

              <div className="field">
                <label className="label">About</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    rows="4"
                    placeholder="A little something about you..."
                    name="about"
                    onChange={handleChange}
                    value={formData.about}
                  />
                </div>
              </div>
            
              {isUploadingImage && <p>Image uploading</p>}
              <div className="field">
                <label className="label" htmlFor="image">Profile Image</label>
                <img 
                  src={formData.image ? formData.image : profileImageLink } 
                  alt={formData.name} 
                  className='memory-edit-image' 
                />
                <br></br>
                <input type="file" id="image" accept="image/png, image/jpeg"
                  onChange={handleImageUpload} />
              </div>
              <br></br>
              <div className="field col d-flex flex-column">
                {isUploadingImage && <p>Image uploading...</p>}
                <button className={`btn ${buttonStyle.default} btn-sm ${isUploadingImage && 'disabled'}`} type="submit">
                Submit
                </button>
                <button className={`btn ${buttonStyle.danger} btn-sm`}>
                Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default ProfileEdit