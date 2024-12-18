// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from '../api/axios';
import { useState, useEffect, useMemo } from 'react';
import { LocationTable } from '../components/LocationTable';
import { MyContainer } from '../components/MyContainer';

export default function Favourites() {
    const [data, setData] = useState([])

    const fetchFavouritesList = async () => {
        try {
            const response = await axios.get('/favourites/');
            const data_favcheck = response.data.map(loc=>{return {...loc, isFav: true}})
            setData(data_favcheck);
        } catch (error) {
            console.error('There was an error fetching the favourites list!', error);
        }
    };

    useEffect(() => {
        fetchFavouritesList();
    }, []);

    return (
        <MyContainer>
            <LocationTable data={data} dataChanger={setData}/>
        </MyContainer>
    )
}