// import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'

import Countries from './components/Countries/Countries'
import CountryShow from './components/Countries/CountryShow'

import MemoryShow from './components/common/memories/MemoryShow'

import AboutUs from './components/common/AboutUs'
import Profile from './components/common/Profile'
import ProfileWithReact from './components/common/ProfileWIthReact'
import ProfileEdit from './components/common/ProfileEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import MapTest from './components/common/maps/MapTest'

function App() {
  return (
    // <h1>Hello World</h1>
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>

        <Route exact path="/profile"><Profile/></Route>
        <Route path ="/profile/:usedId"><ProfileWithReact /></Route>
        <Route path="/profileEdit"><ProfileEdit/></Route>

        <Route exact path="/countries"><Countries/></Route>
        <Route path="/countries/:countryId"><CountryShow/></Route>
        
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>
        
        <Route path="/maptest"><MapTest /></Route>

        <Route path="/memories/:memoryId"><MemoryShow /></Route>


      </Switch>
    </BrowserRouter>
  )
}
export default App


