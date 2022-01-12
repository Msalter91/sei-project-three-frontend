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
      history.push('/profile')
    } catch (err) {
      console.log(err.response.data)
      setIsError(true)
    }
  }

  return (

    <div className="row py-5 px-4">
      <div className="col-md-5 mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="reg-head">  
            
              <div className="d-flex-body mb-1 text-white align-object-center">
                <div className="group-heading">
                  <h4 className="reg-tit text-center text-uppercase align-items-center ms-3">
                  Login<img src="https://i.imgur.com/uBKiZQY.png" 
                      className="mini-logo-wht align-object-center ps-2" alt="placebook-logo"/>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column bd-highlight mb-3">
            <form className="p-2 bd-highlight text-center" onSubmit={handleSubmit}>
              
              <label className="label" htmlFor="email">
                Email</label>
              <div className="control mb-3">
                <input
                  className={`input ${isError.email ? 'is-danger' : ''}`}
                  placeholder="Email Address here"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              {isError.email && (
                <p className="help text-danger">{isError.email}</p>
              )}

              <label className="label" htmlFor="password">
              Password</label>
              <div className="control mb-3">
                <input
                  type="password"
                  className={`input ${isError.password ? 'is-danger' : ''}`}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              {isError.password && (
                <p className="help text-danger">{isError.password}</p>
              )}

              <div className="mb-4">
                <button type="submit" className="btn btn-outline-info btn-sm">
              Log me In!</button>
              </div>
            </form>

            <p className="alt-login text-muted">
                Don&apos;t have an account? <Link to="/register">
                <br></br>Sign up Here!</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
 
  )
}
export default Login


