// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from '../api/axios';
import { useState } from "react"
import { Link } from "react-router-dom"
import { HeartButton } from "./HeartButton"
import Table from "react-bootstrap/Table"
import sortAscSVG from '../assets/sort-ascending.svg'
import sortDscSVG from '../assets/sort-descending.svg'

export const LocationTable = ({ data, dataChanger }) => {
    const [sort, setSort] = useState(-1)
    
    const handleSort = () => {
        const sortedLocData = [...data].sort((a, b) => {return sort * (a.numevents - b.numevents)})
        dataChanger(sortedLocData)
        setSort(sort * -1)
    }
    
    const handleFavList = async (i, isFav) => {
        // add to or remove from list of favourite locations
        if (isFav) {
            await axios.delete('/favourites/' + i);

        } else {
            await axios.post('/favourites', { id: i });
        }

        // reflect change in client side
        const targetIndex = data.findIndex(loc => loc._id == i)
        const newData = [...data]
        newData[targetIndex].isFav = !newData[targetIndex].isFav
        dataChanger(newData)
    }

    const linkURL = (locName) => locName.replace(/\s+/g,'-')

    return (
        <Table>
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
                {data.map((row, i)=>{return(
                    <tr key={i}>
                    <td>{row.id}</td>
                    <td><Link to={"/locations/"+linkURL(row.name)}>{row.name}</Link></td>
                    <td>{row.numevents}</td>
                    <td><HeartButton filled={row.isFav} clickFunc={()=>handleFavList(row._id, row.isFav)} /></td>
                </tr>
                )})}
            </tbody>
        </Table>
    )
}