import { useEffect } from "react"
import { Hero } from "../components/Hero"

export default function Home() {

    useEffect(()=>console.log("landed in home page"), [])
    
    return (
        <Hero>
        </Hero>
    )
}