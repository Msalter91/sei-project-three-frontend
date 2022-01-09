

// import { editWine, getSingleWine } from '../../lib/api'
// import { useHistory, useParams } from 'react-router'
// import Error from '../common/Error'

function ProfileEditDraft() {
// const initialState = {
//   displayName: '',
//   email: '',
//   password: '',
//   firstName: '',
//   lastName: '',
//   about: '',
//   location: '',
//   image: '',
// }
    
  return (
    <section className="section profileEdit">
      <div className="card mx-auto mb-5 shadow-sm mb-2 bg-body rounded col">

        <form className="col-3 mx-auto" 
          // onSubmit={handleSubmit}
        >
          <div className="field-floating mb-2">
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
                name="firstName"
                id="firstName"
                // onChange={handleChange}
              />
            </div>
          </div>


          {/* <div className="field-floating mb-2"> */}
          <label className="label"
            htmlFor="lastName">Last Name</label>
          <div className="control">
            <input
              // className={`input ${formErrors.lastName ? 'is-danger' : '' }`}
              placeholder="Enter Last Name"
              name="lastName"
              id="lastName"
              // onChange={handleChange}
            />
            {/* </div> */}
          </div>
          


          {/* <div className="field-floating mb-2"> */}
          <label className="label"
            htmlFor="lastName">Country</label>
          <div className="control">
            <input
              // className={`input ${formErrors.lastName ? 'is-danger' : '' }`}
              placeholder="Enter Country"
              name="lastName"
              id="lastName"
              // onChange={handleChange}
            />
            {/* </div> */}
          </div>
      

          <div className="col ">
            {/* <form onSubmit={handleSubmit}> */}
            <label className="label"
              htmlFor="lastName">About</label>
            <textarea className="form-control form-control-sm mb-3 shadow mb-2 bg-body rounded text-center fw-lighter"  
              rows="2" placeholder="Enter 'About You' information"
              name="text"
              // onChange={handleChange}
            >
            </textarea>
            
          </div>

        </form>



      </div>
    </section>


  )
}

export default ProfileEditDraft