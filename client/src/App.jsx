import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
const NoMatch = lazy(() => import('./pages/NoMatch'))
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminRoute from './components/AdminRoute';
import { AnimatePresence } from "motion/react"
import { PageTransition } from './components/PageTransition';

function MyRoutes() {
  const location = useLocation();
  
  // apply user info to navbar
  const defaultUserInfo = { 
    username: null, 
    admin: false,
    location: {
      name: "The Chinese University of Hong Kong", 
      latitude: 22.4196, 
      longitude: 114.2068
    }
  }

  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user')) || defaultUserInfo;
      setUserInfo(user);
  }, []);


  // use background image except at landing page
  useEffect(() => {
    const body = document.body;
    
    if (location.pathname == '/') {
        body.classList.add('background-image');
    } else {
        body.classList.remove('background-image');
    }
  }, [location]);


  return(
    <>
    <MyNavbar userInfo={userInfo} setUserInfo={setUserInfo}/>
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          // <PageTransition>
            <Home userInfo={userInfo} setUserInfo={setUserInfo}/>
          // </PageTransition>
        }/>
        <Route path='/login' element = {
          <PublicRoute>
            <Login setUserInfo={setUserInfo}/> 
          </PublicRoute>
        }/>
        <Route path='/register' element={
          <PublicRoute>
            {/* <PageTransition> */}
              <Register/>
            {/* </PageTransition> */}
          </PublicRoute>
        }/>
        <Route path="/events" element={
          <ProtectedRoute>
            {/* <PageTransition> */}
              <Events />
            {/* </PageTransition> */}
          </ProtectedRoute>
        } />
        <Route path="/locations" element={
          <ProtectedRoute>
              {/* <PageTransition> */}
                <Locations />
              {/* </PageTransition> */}
          </ProtectedRoute>
        } />
        <Route path="/locations/:locName" element={
          <ProtectedRoute>
            {/* <PageTransition> */}
              <SingleLocation />
            {/* </PageTransition> */}
          </ProtectedRoute>
        } />
        <Route path="/favourites" element={
          <ProtectedRoute>
            {/* <PageTransition> */}
              <Favourites />
            {/* </PageTransition> */}
          </ProtectedRoute>
        } />
        <Route path="/map" element={
          <ProtectedRoute>
            {/* <PageTransition> */}
              <LocationMap />
            {/* </PageTransition> */}
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } />
        <Route path="*" element={
          <NoMatch />
        } />
      </Routes>
    </AnimatePresence>
    </>
  )

}

function App() {
  return (
    <Suspense>
      <BrowserRouter>
          <MyRoutes />
      </BrowserRouter>
    </Suspense>
  )
}

export default App
