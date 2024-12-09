import { useState, useEffect, useMemo } from 'react';
import { LocationTable } from '../components/LocationTable';
import { MyContainer } from '../components/MyContainer';

export const Favourites = () => {
    const [data, setData] = useState([])

    "*** to be implemented ***"
    // get request to fetch location data
    const locDataURL = "http://127.0.0.1:8080/front_end_testing_favlist" // to be changed
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>setData(d))
    }, [])

    const filteredData = useMemo(()=>
        data.filter(loc => loc.isFav == true),
    [data])

    return (
        <MyContainer>
            <LocationTable data={filteredData} dataChanger={setData}/>
        </MyContainer>
    )
}