import React from 'react'
import { Link } from 'react-router-dom'




function Login() {

  const [isError] = React.useState(false)

  return (
    <section className="section login">
      <div className="card mb-5 shadow-sm mb-2 bg-body rounded">
        <div className="row">
          <div className="col">
            <form className="col">

              <div className="field-floating mb-3">
                <label className="label" htmlFor="email">Email</label>
                <div className="control">
                  <input

                    placeholder="Email Address"
                    name="email"
                    id="email"

                  />
                </div>
              </div>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="password">Password</label>
                <div className="control">
                  <input
                    type="password"

                    placeholder="Password"
                    name="password"
                    id="password"

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