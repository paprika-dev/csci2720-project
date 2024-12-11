import { useParams } from "react-router-dom"
import { Comment } from "../components/Comment"
import { MyContainer } from "../components/MyContainer"
import { useState, useEffect, Suspense } from "react"

export default function SingleLocation() {
    const params = useParams()
    const locName = params.locName.replace(/-+/g,' ')
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const url = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    &q=${locName}`
    
    const locDataURL = `http://127.0.0.1:5000/front_end_testing_single_location/${params.locName}` // to be changed
    useEffect(() => {
        fetch(locDataURL)
        .then(res=>res.json())
        .then(d=>{setData(d); setLoaded(true)})
    }, [])


    return (
        <MyContainer>
            <h5 className="mb-4">{locName}</h5>
            <div className="d-flex flex-column flex-lg-row row-gap-3 column-gap-5">
                <div>
                    <iframe
                        style={{height:"60vh", width:"40vw"}}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={url}>
                    </iframe> 
                </div>
                {/* {!loaded && <div>loading...</div>} */}
                {loaded && <Comment cmts={data.comments ? data.comments : []}></Comment>}
            </div>
        </MyContainer>
    )
}