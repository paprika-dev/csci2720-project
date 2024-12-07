import { useState } from "react"
import { Link } from "react-router-dom"
import { HeartButton } from "./HeartButton"
import Table from "react-bootstrap/Table"
import sortAscSVG from '../assets/sort-ascending.svg'
import sortDscSVG from '../assets/sort-descending.svg'

export const LocationTable = ({ data, dataChanger }) => {
    const [sort, setSort] = useState(-1)
    
    const handleSort = () => {
        const sortedLocData = [...data].sort((a, b) => {return sort * (a.evNum - b.evNum)})
        dataChanger(sortedLocData)
        setSort(sort * -1)
        console.log(sortedLocData)
    }
    
    const handleFavList = async (i, isFav) => {
        // add to or remove from list of favourite locations
        const favListURL = "http://127.0.0.1:8080/front_end_testing_favlist/" // to be changed

        const res = await fetch(favListURL, {
            method: isFav ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "locId": i
            }),
          })
        
        // reflect change in client side
        const targetIndex = data.findIndex(loc => loc.id == i)
        const newData = [...data]
        newData[targetIndex].isFav = !newData[targetIndex].isFav
        dataChanger(newData)
    }

    return (
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
                {data.map((row, i)=>{return(
                    <tr key={i}>
                    <td>{row.id}</td>
                    <td><Link to={"/locations/"+row.id}>{row.name}</Link></td>
                    <td>{row.evNum}</td>
                    <td><HeartButton filled={row.isFav} clickFunc={()=>handleFavList(row.id, row.isFav)} /></td>
                </tr>
                )})}
            </tbody>
        </Table>
    )
}