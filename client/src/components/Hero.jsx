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
            <svg className='bg-circle-2' height="300" width="300" xmlns="http://www.w3.org/2000/svg">
                 <circle r="150" cx="150" cy="150" fill="red" />
            </svg>
            <svg className='bg-circle-1' height="500" width="500" xmlns="http://www.w3.org/2000/svg">
                    <circle r="250" cx="250" cy="250" fill="blue" />
            </svg>
        </Container>
        </>

    )
}