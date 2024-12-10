import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { MyNavbar} from './components/NavBar'
const Home = lazy(() => import('./pages/Home'))
const Locations = lazy(() => import('./pages/Locations'))
const LocationMap = lazy(() => import('./pages/Map'))
const SingleLocation = lazy(() => import('./pages/SingleLocation'))
const Favourites = lazy(() => import('./pages/Favourites'))
const Events = lazy(() => import('./pages/Events'))
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Suspense>
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
    </Suspense>
  )
}

export default App
