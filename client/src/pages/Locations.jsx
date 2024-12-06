import { useState, useMemo } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import searchSVG from '../assets/search.svg'
import sortAscSVG from '../assets/sort-ascending.svg'
import sortDscSVG from '../assets/sort-descending.svg'
import heartFilledSVG from '../assets/heart-filled.svg'
import heartEmptySVG from '../assets/heart-empty.svg'
import './Locations.css'
import { HeartButton } from '../components/HeartButton';

export const Locations = () => {

    "*** to be implemented ***"
    // get request to fetch location data
    const locData = [
        {id: 1, name: "dummy_Hong Kong Coliseum (Arena)", evNum: 10, isFav: true},
        {id: 2, name: "dummy_Hong Kong Film Archive (Cinema)", evNum: 3, isFav: false},
        {id: 3, name: "dummy_Hong Kong Film Archive (Foyer)", evNum: 7, isFav: true},
        {id: 4, name: "dummy_Black Box Theatre, Kwai Tsing Theatre", evNum: 20, isFav: true},
        {id: 5, name: "dummy_Tsuen Wan Town Hall (Auditorium)", evNum: 12, isFav: false}
    ]

    const [sort, setSort] = useState(-1)
    const [query, setQuery] = useState("")
    const [data, setData] = useState(locData)
    
    const handleSort = () => {
        const sortedLocData = [...data].sort((a, b) => {return sort * (a.evNum - b.evNum)})
        setData(sortedLocData)
        setSort(sort * -1)
    }
    
    const addToFav = (i) => {
        const targetIndex = data.findIndex(loc => loc.id == i)
        const newData = [...data]
        newData[targetIndex].isFav = !newData[targetIndex].isFav
        setData(newData)

        "*** to be implemented ***"
        // post request to add to fav list
        // del request to remove from fav list
    }

    const filteredData = useMemo(()=>
        data.filter(loc => loc.name.toLowerCase().includes(query.toLowerCase())),
    [data, query])
    

    return (
        <Container className='w-75'>
            <div className='d-flex justify-content-end my-3'>
                <div>
                    <label htmlFor="locSearch" className='me-2'><img src={searchSVG} /></label>
                    <input id="locSearch" value={query} onChange={e=>setQuery(e.target.value)}></input>
                </div>
            </div>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th className='col-1'>ID</th>
                    <th className='col-5'>Location</th>
                    <th className='col-2'>
                        No. of Events&nbsp;
                        <button onClick={handleSort}><img src={sort == 1 ? sortDscSVG : sortAscSVG} /></button>
                    </th>
                    <th className='col-2'>Add to Favourites</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, i)=>{return(
                        <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.evNum}</td>
                        <td><HeartButton filled={row.isFav} clickFunc={()=>addToFav(row.id)} /></td>
                    </tr>
                    )})}
                </tbody>
            </Table>
        </Container>
        
    )
}