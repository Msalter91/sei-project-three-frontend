import React from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { loginUser } from '../../lib/api'
import { getUserId, setToken } from '../../lib/auth'

function Login() {
  const history = useHistory()
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  const [isError, setIsError] = React.useState(false)
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      getUserId()
      history.push(`/profile/${getUserId()}`)
    } catch (err) {
      console.log(err.response.data)
      setIsError(true)
    }
  }

  return (
    <section className="section login">
      <div className="card mb-5 shadow-sm mb-2 bg-body rounded">
        <div className="row">
          <div className="col">
            <form className="col" onSubmit={handleSubmit}>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                  <input
                    className={`input ${isError.email ? 'is-danger' : ''}`}
                    placeholder="Email Address"
                    name="email"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="password">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className={`input ${isError.password ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {isError && (
                <p className="help is-danger field">
              Password or Email were incorrect
                </p>
              )}

              <div className="mb-5">
                <button type="submit" className="btn btn-dark btn-outline-warning btn-lg">
                Log Me In!
                </button>
              </div>
            </form>
          </div>
          <p className="alt-login">
        Don&apos;t have an account? 
            {' '}<Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
export default Login