// import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Nav from './components/common/Nav'

import Countries from './components/Countries/Countries'
import CountryShow from './components/Countries/CountryShow'

import MemoryShow from './components/common/memories/MemoryShow'

import AboutUs from './components/common/AboutUs'
import Profile from './components/common/Profile'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import MapTest from './components/common/maps/MapTest'
import TripEdit from './components/common/trips/TripEdit'
import TripCreate from './components/common/trips/TripCreate'

function App() {
  return (
    // <h1>Hello World</h1>
    <BrowserRouter>
      <Nav/>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/aboutus"><AboutUs/></Route>

        <Route path="/profile"><Profile/></Route>

        <Route exact path="/countries"><Countries/></Route>
        <Route path="/countries/:countryId"><CountryShow/></Route>
        
        <Route path="/register"><Register/></Route>
        <Route path="/login"><Login/></Route>

        <Route path="/trips/:tripId/edit"><TripEdit /></Route>
        <Route path="/trips/create"><TripCreate /></Route>
        
        <Route path="/maptest"><MapTest /></Route>

        <Route path="/memories/:memoryId"><MemoryShow /></Route>

      </Switch>
    </BrowserRouter>
  )
}
export default App


