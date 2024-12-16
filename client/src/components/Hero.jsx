import './Hero.css'
import Container from "react-bootstrap/Container";

export const Hero = ({children}) => {
    return(
        <Container className='hero'>
            <p className='tagline'>Thinking where to go?</p>
            <div className='user-location-input'>
                {children}
            </div>
        </Container>
    )
}