import { useState, useEffect, useMemo } from 'react';
import { LocationTable } from '../components/LocationTable';
import Container from 'react-bootstrap/esm/Container';

export const Favourites = () => {
    const [data, setData] = useState([])

    "*** to be implemented ***"
    // get request to fetch location data
    const locDataURL = "http://127.0.0.1:8080/front_end_testing_favlist" // to be changed
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>setData(d))
        .then(console.log("favlist get"))
    }, [])

    const filteredData = useMemo(()=>
        data.filter(loc => loc.isFav == true),
    [data])

    return (
        <Container className='w-75 mt-5'>
            <LocationTable data={filteredData} dataChanger={setData}/>
        </Container>
    )
}