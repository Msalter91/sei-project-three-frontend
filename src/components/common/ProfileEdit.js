import axios from 'axios'
import React, { useMemo, useState } from 'react'
import Select from 'react-select'
import { getUserId } from '../../lib/auth'

import countryList from 'react-select-country-list'
import { editUser } from '../../lib/api'



console.log(process.env.REACT_APP_CLOUDINARY_URL)
console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

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


  const [countryValue, setCountryValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  

  const changeHandler = value => {
    setCountryValue(value.label)
    setFormData({ ...formData, location: value.label })
  }
  const [formData, setFormData] = React.useState({})

  console.log(formData)

  const [user, setUser] = React.useState(null)

  React.useEffect( ()=>{
    const getUser = async () => {
      try {
        const userData = await axios.get(`/api/profile/${getUserId()}`)
        setUser(userData.data)
        setFormData(userData.data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])
  
  console.log(formData)
  const [formErrors, setFormErrors] = React.useState(initialState)

  const [isUploadingImage, setIsUploadingImage] = React.useState(false)
  
  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }


  const handleSubmit = async e => {
    e.preventDefault()
    formData.displayName = user.displayName
    formData.email = user.email
    window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
    try {
      const res = await editUser(formData, getUserId())
      console.log(res)
      // history.push(`/cheeses/${res.data._id}`)
    } catch (err) {
      setFormErrors(err.response.data.errors)
      console.log(err)
    }
  }

  const handleImageUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PROFILE)
    setIsUploadingImage(true)
    const res = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, data)
    setFormData({ ...formData, profileImage: res.data.url })
    setIsUploadingImage(false)
  }

  return (
    <main className="section profileEdit">
      <div className="col">
        <div className="card mx-auto mb-5 shadow-sm mb-2 bg-body rounded col">
          
          <form onSubmit={handleSubmit}>

            <div className="field">
              <label className="label">Display Name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder={user && user.displayName}
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
                  placeholder={user && user.email}
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
                  value={formData && formData.firstName}
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
                  value={formData && formData.surname}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                { user && (<Select options={options} value={countryValue} onChange={changeHandler} /> ) }
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
                  value={formData && formData.about}
                />
              </div>
            </div>
            
            {isUploadingImage && <p>Image uploading</p>}
            {formData.profileImage ?
              <div>
                <img src={formData.profileImage} alt="uploaded image"/>
              </div>
              :
              <div className="field">
                <label className="label" htmlFor="image">Profile Image</label>
                <br></br>

                <input type="file" id="image" accept="image/png, image/jpeg"
                  onChange={handleImageUpload} />

              </div>
            }
            <br></br>
            <div className="field col d-flex flex-column">
              <button className="btn btn-outline-info btn-sm" type="submit">
                Submit
              </button>
            </div>

          </form>

        </div>
      </div>
    </main>
  )
}

export default ProfileEdit