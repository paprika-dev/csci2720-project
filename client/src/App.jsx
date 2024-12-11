import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { MyNavbar } from './components/NavBar'
const Home = lazy(() => import('./pages/Home'))
const Locations = lazy(() => import('./pages/Locations'))
const LocationMap = lazy(() => import('./pages/Map'))
const SingleLocation = lazy(() => import('./pages/SingleLocation'))
const Favourites = lazy(() => import('./pages/Favourites'))
const Events = lazy(() => import('./pages/Events'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Admin = lazy(() => import('./pages/Admin'))
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoute from './components/AdminRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.isAdmin ? true : false;
  });

  return (
    <Suspense>
      <BrowserRouter>
        {isAuthenticated && <MyNavbar setIsAuthenticated={setIsAuthenticated}/>}
        <Routes>
          <Route path="/" element={
            <PublicRoute>
              <Login setIsAuthenticated={setIsAuthenticated}/> 
            </PublicRoute>
          }/>
          <Route path='/login' element = {
            <PublicRoute>
              <Login setIsAuthenticated={setIsAuthenticated}/> 
            </PublicRoute>
          }/>
          <Route path='/register' element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          }/>
          <Route path="/events" element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/locations" element={
            <ProtectedRoute>
              <Locations />
            </ProtectedRoute>
          } />
          <Route path="/locations/:locName" element={
            <ProtectedRoute>
              <SingleLocation />
            </ProtectedRoute>
          } />
          <Route path="/favourites" element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <LocationMap />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          } />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
