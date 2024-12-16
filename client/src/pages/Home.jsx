import { useEffect } from "react"
import { Hero } from "../components/Hero"
import { UserLocation } from "../components/UserLocation"

export default function Home({ setUserInfo }) {

    useEffect(()=>console.log("landed in home page"), [])
    
    return (
        <>
        <Hero>
        </Hero>
        <UserLocation setUserInfo={setUserInfo}></UserLocation>
        </>

    )
}