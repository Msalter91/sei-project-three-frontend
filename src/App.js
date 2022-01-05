// import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import AboutUs from './components/common/AboutUs'
import Nav from './components/common/Nav'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    // <h1>Hello World</h1>
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>
      </Switch>
    </BrowserRouter>
  )
}
export default App


