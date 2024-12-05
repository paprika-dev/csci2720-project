import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import sortAscSVG from '../assets/sort-ascending.svg'
import sortDscSVG from '../assets/sort-descending.svg'
import heartFilledSVG from '../assets/heart-filled.svg'
import heartEmptySVG from '../assets/heart-empty.svg'
import './Locations.css'

export const Locations = () => {

    const locData = [
        {id: 1, locName: "dummy_loc1", evNum: 10, isFav: true},
        {id: 2, locName: "dummy_loc2", evNum: 3, isFav: false},
        {id: 3, locName: "dummy_loc3", evNum: 7, isFav: true}
    ]

    const [data, setData] = useState(locData)
    const [sort, setSort] = useState(-1)
    
    const handleSort = () => {
        const sortedLocData = [...data].sort((a, b) => {return sort * (a.evNum - b.evNum)})
        setData(sortedLocData)
        setSort(sort * -1)
    }

    return (
        <Container className='w-75'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th className='col-1'>ID</th>
                    <th className='col-2'>Location</th>
                    <th className='col-2'>
                        No. of Events&nbsp;
                        <button onClick={handleSort}><img src={sort == 1 ? sortDscSVG : sortAscSVG} /></button>
                    </th>
                    <th className='col-2'>Add to Favourites</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i)=>{return(
                        <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.locName}</td>
                        <td>{row.evNum}</td>
                        <td><button><img src={row.isFav ? heartFilledSVG : heartEmptySVG}  /></button></td>
                    </tr>
                    )})}
                </tbody>
            </Table>
        </Container>
        
    )
}