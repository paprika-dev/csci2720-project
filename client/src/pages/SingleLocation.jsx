import { useParams } from "react-router-dom"
import { Comment } from "../components/Comment"
import { MyContainer } from "../components/MyContainer"

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

    //retrive location info\

    const url = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    &q=Space+Needle,Seattle+WA`

    return (
        <MyContainer>
            <div className="d-flex flex-column flex-lg-row row-gap-3 column-gap-5">
                <div>
                    <p>Location {params.locid}</p>
                    <iframe
                        style={{height:"45vh", width:"40vw"}}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={url}>
                    </iframe>
                </div>
                <Comment></Comment>
            </div>
        </MyContainer>
    )
}