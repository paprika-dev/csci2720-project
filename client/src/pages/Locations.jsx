// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from '../api/axios';
import { useState, useMemo, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import searchSVG from '../assets/search.svg'
import filterSVG from '../assets/filter.svg'
import distanceSVG from '../assets/distance.svg'
import { LocationTable } from '../components/LocationTable';
import { Slider } from '../components/Slider';
import { MyContainer } from '../components/MyContainer';
import { haversine } from '../utils/haversine';

export default function Locations() {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [distance, setDistance] = useState(30)
    const [category, setCategory] = useState("all")

    
    const fetchLocationsData = async () => {
        try {
            const response = await axios.get('/locations');
            const userLocation = JSON.parse(localStorage.getItem('user')).location
            const data_withDistance = response.data.map(loc=>{
                return {...loc, distance: haversine(
                    loc.latitude, 
                    loc.longitude, 
                    userLocation.latitude, 
                    userLocation.longitude)
                }})
            setData(data_withDistance);
            console.log(data_withDistance)
        } catch (error) {
            console.error('There was an error fetching the location data!', error);
        }
    };

    useEffect(() => {
        fetchLocationsData();
    }, []);


    const filteredData = useMemo(()=>
        data.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()) && 
                            (category == "all" ? 1 : loc.category.includes(category)) &&
                            loc.distance < distance),
    [data, query, category, distance])
    
    const categories = [...new Set(data.flatMap(loc => loc.category))]

    return (
        <MyContainer>
            <div className='d-flex align-items-center mb-3 gap-4'>
                <div className='d-flex align-items-center gap-2 position-relative'>
                    <img src={distanceSVG} />
                    <Slider 
                        value={distance} 
                        max={45}
                        min={5}
                        stepSize={5} 
                        setValue={setDistance} 
                        tag={"< "+distance+" km"}
                    />
                </div>
                <div className='d-flex align-items-center gap-2'>
                    <label htmlFor="catSelect"><img src={filterSVG} /></label>
                    <Form.Select id="catSelect" onChange={e=>setCategory(e.target.value)}>
                        <option key="all" value="all">All categories</option>
                        {categories.map(cat=>{return(
                            <option key={cat} value={cat}>{cat}</option>
                        )})}
                    </Form.Select>
                </div>

                <div className='d-flex align-items-center gap-2'>
                    <label htmlFor="locSearch"><img src={searchSVG} /></label>
                    <Form.Control id="locSearch" value={query} onChange={e=>setQuery(e.target.value)}></Form.Control>
                </div>
            </div>
            <LocationTable data={filteredData} dataChanger={setData}/>
        </MyContainer>
    )
}
