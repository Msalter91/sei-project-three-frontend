import React from 'react'
import { useHistory } from 'react-router/'
import { Link } from 'react-router-dom'
import { registerUser } from '../../lib/api'

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
      setFormErrors(err.response.data.errors)
    }
  }

  console.log('form data', formData)
  console.log('form errors', formErrors)
  
  return (
    <section className="section registration">
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
export default Register