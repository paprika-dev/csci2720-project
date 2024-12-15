import axios from '../api/axios';
import { useParams } from "react-router-dom"
import { Comment } from "../components/Comment"
import { MyContainer } from "../components/MyContainer"
import { useState, useEffect } from "react"

export default function SingleLocation() {
    const params = useParams()
    const locName = params.locName.replace(/-+/g,' ')
    const googleMapURL = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${locName}`
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)

    const fetchLocationData = async () => {
        try {
            const response = await axios.get('/locations/' + locName);
            setData(response.data);
            console.log(response.data)
            setLoaded(true);
        } catch (error) {
            console.error('There was an error fetching the location data!', error);
        }
    };

    useEffect(() => {
        fetchLocationData();
    }, []);

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
                        src={googleMapURL}>
                    </iframe> 
                </div>
                {!loaded && <div>Loading comments...</div>}
                {loaded && <Comment lid={data._id} cmts={data.comments}></Comment>}
            </div>
        </MyContainer>
    )
}