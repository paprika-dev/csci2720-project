import { useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import searchSVG from '../assets/search.svg'
import filterSVG from '../assets/filter.svg'
import distanceSVG from '../assets/distance.svg'
import { LocationTable } from '../components/LocationTable';
import { Slider } from '../components/Slider';
import './Locations.css'

export const Locations = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    const [distance, setDistance] = useState(80)
    const [category, setCategory] = useState("all")
    
    // get request to fetch location data
    const locDataURL = "http://127.0.0.1:8080/front_end_testing_all_locations" // to be changed
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>setData(d))
    }, [])

    const filteredData = useMemo(()=>
        data.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase()) && 
                            (category == "all" ? 1 : loc.evCat.includes(category)) &&
                            loc.distance < distance),
    [data, query, category, distance])
    
    const categories = [...new Set(data.flatMap(loc => loc.evCat))]

    return (
        <Container className='myContainer w-75 my-5 py-5 px-5'>
            <div className='d-flex justify-content-end align-items-center mb-3 gap-4'>
                <div className='d-flex align-items-center gap-2 position-relative'>
                    <img src={distanceSVG} />
                    <Slider value={distance} stepSize={5} setValue={setDistance} tag={"< "+distance+" km"}></Slider>
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
        </Container>
        
    )
}
