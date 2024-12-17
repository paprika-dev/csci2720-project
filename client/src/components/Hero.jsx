import './Hero.css'
import Container from "react-bootstrap/Container";

export const Hero = ({children}) => {
    return(
        <>
        <Container className='hero'>
            <p className='tagline m-0'>Discover the rhythm, art, and drama near you. Los geht's!</p>
            <div className='user-location-input'>
                {children}
            </div>
            <svg className='bg-circle-1' height="500" width="500" xmlns="http://www.w3.org/2000/svg">
                    <circle r="250" cx="250" cy="250" fill="#cdcaef"/>
            </svg>
            <svg className='bg-circle-2' height="300" width="300" xmlns="http://www.w3.org/2000/svg">
                 <circle r="150" cx="150" cy="150" fill="#F5613E"/>
            </svg>
            <svg className='bg-circle-3' height="180" width="180" xmlns="http://www.w3.org/2000/svg">
                    <circle r="90" cx="90" cy="90" fill="white"/>
            </svg>
        </Container>
        </>

    )
}