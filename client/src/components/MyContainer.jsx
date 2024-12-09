import Container from "react-bootstrap/Container";
import './MyContainer.css'

export const MyContainer = ({children}) => {
    return(
        <>
        <Container className="myContainer w-75 my-5 py-5 px-5">
            <div className="d-flex flex-column align-items-center">
                {children}
            </div>
        </Container>
        </>
    )
}