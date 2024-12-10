import { useParams } from "react-router-dom"
import { Comment } from "../components/Comment"

const locData = [
    {id: 1, name: "dummy_Hong Kong Coliseum (Arena)", evNum: 10, isFav: true},
    {id: 2, name: "dummy_Hong Kong Film Archive (Cinema)", evNum: 3, isFav: false},
    {id: 3, name: "dummy_Hong Kong Film Archive (Foyer)", evNum: 7, isFav: true},
    {id: 4, name: "dummy_Black Box Theatre, Kwai Tsing Theatre", evNum: 20, isFav: true},
    {id: 5, name: "dummy_Tsuen Wan Town Hall (Auditorium)", evNum: 12, isFav: false}
]

export default function SingleLocation() {
    const params = useParams()
    params.locid

    //retrive location info

    return (
        <>
            <p>Location {params.locid}</p>
            <Comment></Comment>
        </>
    )
}