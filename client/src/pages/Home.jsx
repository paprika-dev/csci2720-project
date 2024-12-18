// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

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