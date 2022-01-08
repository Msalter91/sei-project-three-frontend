// import React from 'react'
// import { editWine, getSingleWine } from '../../lib/api'
// import { useHistory, useParams } from 'react-router'
// import Error from '../common/Error'


// const initialState = {
//   displayName: '',
//   email: '',
//   password: '',
//   forename: '',
//   surname: '',
//   about: '',
//   image: '',
// }

//*note: memories "edit & delete " ideally should have these functions on "show memories page"?)

function ProfileEdit() {

  return (
    <section className="section profileEdit">
      <div className="card mx-auto mb-5 shadow-sm mb-2 bg-body rounded col">

        <form className="col-3 mx-auto" 
          // onSubmit={handleSubmit}
        >
          <div className="field-floating mb-3">
            <label className="label"
              htmlFor="displayName">Display name</label>
            <div className="control">
              <input
                // className={`input ${formErrors.displayName ? 'is-danger' : '' }`}
                placeholder="***should be current userID displayName?"
                name="displayName"
                id="displayName"
                // onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-floating mb-2">
            <label className="label"
              htmlFor="email">email</label>
            <div className="control">
              <input
                // className={`input ${formErrors.email ? 'is-danger' : '' }`}
                placeholder="email***current userID email address?"
                name="email"
                id="email"
                // onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-floating mb-2">
            <label className="label"
              htmlFor="firstName">First Name</label>
            <div className="control">
              <input
                // className={`input ${formErrors.firstName ? 'is-danger' : '' }`}
                placeholder="Enter First Name"
                //*placeholder should be current userID email address?
                name="email"
                id="email"
                // onChange={handleChange}
              />
            </div>
          </div>

    

          {/* <div className="input-group">
        <input type="file" className="form-control" id="inputAvatar" aria-describedby="inputAvatarFile" aria-label="Upload"/>
        <button className="btn btn-outline-secondary" type="button" id="inputAvatarFile">Upload</button>
      </div> */}


        </form>



      </div>
    </section>


  )
}
export default ProfileEdit