import React from 'react'
import { useHistory } from 'react-router/'
import { Link } from 'react-router-dom'
import { registerUser } from '../../lib/api.js'
import { buttonStyle } from '../../lib/bootstrap-css-config.js'

const initialState = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

function Register() {
  const [formData, setFormData] = React.useState(initialState)
  const [formErrors, setFormErrors] = React.useState(initialState)
  const history = useHistory()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(formData)
      history.push('/login')
    } catch (err) {
      console.log(err.response.data)
      setFormErrors(err.response.data.errors)
    }
  }

  console.log('form data', formData)

  return (

    
    <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="reg-head">  

              <div className="d-flex-body mb-1 text-white align-object-center">
                <div className="group-heading">
                  <h4 className="reg-tit text-center text-uppercase lign-items-center ms-3">
                  Register Account<img src="https://i.imgur.com/uBKiZQY.png" 
                      className="mini-logo-wht align-object-center ps-2" alt="placebook-logo"/>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column bd-highlight mb-3">
            <form className="p-2 bd-highlight text-center" onSubmit={handleSubmit}>
              <label className="label" htmlFor="displayName">
              Display name</label>
              <div className="control mb-3">
                <input 
                  className={`input ${formErrors.displayName ? 'is-danger' : '' }`}
                  placeholder="Display Name"
                  name="displayName"
                  id="displayName"
                  onChange={handleChange}
                />
              </div>
              {formErrors.displayName && (
                <p className="text-danger">{formErrors.displayName}</p>
              )}

              <label className="label" htmlFor="email">
                Email</label>
              <div className="control mb-3">
                <input
                  className={`input ${formErrors.email ? 'is-danger' : ''}`}
                  placeholder="Email Address here"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && (
                <p className="help text-danger">{formErrors.email}</p>
              )}

              <label className="label" htmlFor="password">
              Password</label>
              <div className="control mb-3">
                <input
                  type="password"
                  className={`input ${formErrors.password ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              {formErrors.password && (
                <p className="help text-danger">{formErrors.password}</p>
              )}

              <label className="label" htmlFor="passwordConfirmation">
              Password Confirmation</label>
              <div className="control mb-3">
                <input
                  type="password"
                  className={`input ${
                    formErrors.passwordConfirmation ? 'is-danger' : ''
                  }`}
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  onChange={handleChange}
                />
              </div>
              {formErrors.passwordConfirmation && (
                <p className="help text-danger">{formErrors.passwordConfirmation}</p>
              )}
              <div className="mb-4">
                <button type="submit" className={`btn ${buttonStyle.default} btn-sm`}>
              Register Me!</button>
              </div>
            </form>

            <p className="alt-login text-muted">
                Already have an account? <Link to="/login">
                <br></br>Log In Here</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
 
  )
}
export default Register





//* BACK UP REG FORM before AC restyle //

/* <section className="section registration">
       <div className="card mx-auto mb-5 shadow-sm mb-2 bg-body rounded col">

         <form className="col-3 mx-auto" onSubmit={handleSubmit}>
           <div className="field-floating mb-3">
             <label className="label" htmlFor="displayName">
                   Display name
             </label>
             <div className="control">
                   <input
                className={`input ${formErrors.displayName ? 'is-danger' : '' }`}
                placeholder="Display Name"
                name="displayName"
                id="displayName"
                onChange={handleChange}
              />
            </div>
            {formErrors.displayName && (
              <p className="is-danger">{formErrors.displayName}</p>
            )}
          </div>

          <div className="field-floating mb-3">
            <label className="label" htmlFor="email">
                  Email
            </label>
            <div className="control">
              <input
                className={`input ${formErrors.email ? 'is-danger' : ''}`}
                placeholder="Email Address here"
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            {formErrors.email && (
              <p className="help is-danger">{formErrors.email}</p>
            )}
          </div>

          <div className="field-floating mb-3">
            <label className="label" htmlFor="password">
            Password
            </label>
            <div className="control">
              <input
                type="password"
                className={`input ${formErrors.password ? 'is-danger' : ''}`}
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            {formErrors.password && (
              <p className="help is-danger">{formErrors.password}</p>
            )}
          </div>

          <div className="field-floating mb-3">
            <label className="label" htmlFor="passwordConfirmation">
            Password Confirmation
            </label>
            <div className="control">
              <input
                type="password"
                className={`input ${
                  formErrors.passwordConfirmation ? 'is-danger' : ''
                }`}
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                id="passwordConfirmation"
                onChange={handleChange}
              />
            </div>
            {formErrors.passwordConfirmation && (
              <p className="help is-danger">{formErrors.passwordConfirmation}</p>
            )}
          </div>


          <div className="mb-4">
            <button type="submit" className="btn btn-dark btn-outline-warning btn-lg">
                  Register Me!
            </button>
          </div>
        </form>
      </div>

      <p className="alt-login">
            Already have an account? <Link to="/login"> Log In Here</Link>
      </p>
    </section>
  )
}
export default Register */