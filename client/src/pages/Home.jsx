import { useEffect } from "react"
import { Hero } from "../components/Hero"
import { UserLocation } from "../components/UserLocation"
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Home({ userInfo, setUserInfo }) {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <Hero>
            {userInfo.username ? 
            <UserLocation setUserInfo={setUserInfo}></UserLocation> : 
            <p>
            <Button variant="outline-success" onClick={handleLogin}>Login to discover more</Button>
            </p>
            }
        </Hero>
        </>
    )
}