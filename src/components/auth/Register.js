import React from 'react'
import { Link } from 'react-router-dom'

function Register() {

  return (
    <section className="section registration">
      <div className="card mb-5 shadow-sm mb-2 bg-body rounded">
        <div className="row">
          <div className="col">

            <form className="col">
              <div className="field-floating mb-3">
                <label className="label" htmlFor="displayname">
                  Displayname
                </label>
                <div className="control">
                  <input
                    placeholder="Display Name"
                    name="displayname"
                    id="displayname"
                  />
                </div>
              </div>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <div className="control">
                  <input
                    placeholder="Email Address here"
                    name="email"
                    id="email"
                  />
                </div>
              </div>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="control">
                  <input/>
                </div>
              </div>

              <div className="field-floating mb-3">
                <label className="label" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <div className="control">
                  <input/>
                </div>
              </div>

              <div className="mb-5">
                <button type="submit" className="btn btn-dark btn-outline-warning btn-lg">
                  Register Me!
                </button>
              </div>
            </form>
          </div>

          <p className="alt-login">
            Already have an account?<Link to="/login">Log In Here</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
export default Register