import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MapTest from './Components/common/MapTest'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/maptest">
          <MapTest />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
