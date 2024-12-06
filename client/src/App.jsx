import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { MyNavbar} from './components/NavBar'
import { Home } from './pages/Home'
import { Locations } from './pages/Locations'
import { Events } from './pages/Events'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Favourites } from './pages/Favourites';
import { LocationMap } from './pages/Map';
import { SingleLocation } from './pages/SingleLocation';

function App() {

  return (
    <BrowserRouter>
      <MyNavbar></MyNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:locid" element={<SingleLocation />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/map" element={<LocationMap />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
