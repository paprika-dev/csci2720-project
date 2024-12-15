import { useEffect } from "react"
import { Hero } from "../components/Hero"
import { HomeMap } from "../components/PlacesAutocomplete"

export default function Home() {

    useEffect(()=>console.log("landed in home page"), [])
    
    return (
        <>
        <Hero>
        </Hero>
        {/* <HomeMap>
        </HomeMap> */}
        </>

    )
}