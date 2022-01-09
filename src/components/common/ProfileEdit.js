import axios from 'axios'
import React from 'react'

console.log(process.env.REACT_APP_CLOUDINARY_URL)
console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)

function ProfileEdit() {
  // const initialState = {
  const [formData, setFormData] = React.useState({
    displayName: '',
    email: '',
    firstName: '',
    lastName: '',
    About: '',
    profileImage: '',
  })
  
  // const [formData, setFormData] = React.useState(initialState)
  // const [formErrors, setFormErrors] = React.useState(initialState)

  const [isUploadingImage, setIsUploadingImage] = React.useState(false)
  
  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    window.alert(`Submitting ${JSON.stringify(formData, null, 2)}`)
  }

  const handleImageUpload = async (e) => {
    const data = new FormData()
    data.append('file', e.target.files[0])
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
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
                // className={`input ${formErrors.displayName ? 'is-danger' : '' }`}
                  className="input"
                  placeholder="***should be current userID displayName?"
                  name="displayName"
                  id="displayName"
                  // value={formData.displayName}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                // className={`input ${formErrors.email ? 'is-danger' : '' }`}
                  className="input"
                  placeholder="***should be current userID email?"
                  name="email"
                  id="email"
                  // value={formData.email}
                  // onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  // className={`input ${formErrors.firstName ? 'is-danger' : '' }`}
                  className="input"
                  placeholder="Enter First Name"
                  name="firstName"
                  // value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

            </div>
            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                // className={`input ${formErrors.lastName ? 'is-danger' : '' }`}
                  className="input"
                  placeholder="Enter Last Name"
                  name="lastName"
                  // value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <input
                // className={`input ${formErrors.country ? 'is-danger' : '' }`}
                  className="input"
                  placeholder="Enter your country"
                  name="country"
                  // value={formData.country}
                  onChange={handleChange}
                />
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
                  // value={formData.about}
                  onChange={handleChange}
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