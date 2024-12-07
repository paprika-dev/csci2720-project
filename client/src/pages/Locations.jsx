import { useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import searchSVG from '../assets/search.svg'
import filterSVG from '../assets/filter.svg'
import { LocationTable } from '../components/LocationTable';

export const Locations = () => {
    const [query, setQuery] = useState("")
    const [data, setData] = useState([])
    
    // get request to fetch location data
    const locDataURL = "http://127.0.0.1:8080/front_end_testing_all_locations" // to be changed
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>setData(d))
    }, [])

    const filteredData = useMemo(()=>
        data.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase())),
    [data, query])
    

    return (
        <Container className='w-75'>
            <div className='d-flex justify-content-end my-3'>
                <div>
                    <label htmlFor="distance Filter" className='me-2'><img src={filterSVG} /></label>
                    {/* <input id="locSearch" value={query} onChange={e=>setQuery(e.target.value)}></input> */}
                </div>
                <div>
                    <label htmlFor="CategoryDropdown" className='me-2'><img src={filterSVG} /></label>
                    {/* <input id="locSearch" value={query} onChange={e=>setQuery(e.target.value)}></input> */}
                </div>
                <div>
                    <label htmlFor="locSearch" className='me-2'><img src={searchSVG} /></label>
                    <input id="locSearch" value={query} onChange={e=>setQuery(e.target.value)}></input>
                </div>
            </div>
            <LocationTable data={filteredData} dataChanger={setData}/>
        </Container>
        
    )
}
