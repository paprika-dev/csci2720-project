import axios from '../api/axios';
import { useState, useEffect, useMemo } from 'react';
import { LocationTable } from '../components/LocationTable';
import { MyContainer } from '../components/MyContainer';

export default function Favourites() {
    const [data, setData] = useState([])

    const fetchFavouritesList = async () => {
        try {
            const response = await axios.get('/favourites/');
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('There was an error fetching the favourites list!', error);
        }
    };

    useEffect(() => {
        fetchFavouritesList();
    }, []);

    // const filteredData = useMemo(()=>
    //     data.filter(loc => loc.isFav == true),
    // [data])

    return (
        <MyContainer>
            <LocationTable data={data} dataChanger={setData}/>
        </MyContainer>
    )
}