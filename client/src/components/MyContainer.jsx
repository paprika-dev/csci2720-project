// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

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