import { useState, useMemo, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { EventGrid } from '../components/EventGrid';
import { MyContainer } from '../components/MyContainer';
import Form from 'react-bootstrap/Form';
import filterSVG from '../assets/filter.svg';
import searchSVG from '../assets/search.svg';
import distanceSVG from '../assets/distance.svg';
import { Slider } from '../components/Slider';

export default function Events() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [distance, setDistance] = useState(50);
    const [category, setCategory] = useState("all");
    
    // Fetch event data
    const eventsDataURL = "http://127.0.0.1:5000/front_end_testing_all_events"; // to be updated
    useEffect(() => {
        fetch(eventsDataURL)
            .then(res => res.json())
            .then(d => setData(d));
    }, []);

    // Filter events based on inputs
   
    const filteredData = useMemo(() =>
        data.filter(event => {
            const eventTitle = event.title?.toLowerCase() || ""; // Safely convert to lowercase
            const searchQuery = query?.toLowerCase() || ""; // Safely convert to lowercase
    
            return (
                eventTitle.includes(searchQuery) &&
                (category === "all" ? true : event.category?.includes(category)) &&
                event.distance <= distance
            );
        }),
    [data, query, category, distance]);
    const categories = [...new Set(data.flatMap(event => event.category))];

    return (
        <MyContainer>
            {/* Top Banner */}
            <Carousel>
                {data.slice(0, 5).map(event => (
                    <Carousel.Item key={event.id}>
                        <img img width={800} height={200}
                            className="d-block img-responsive border border-danger"
                            src={event.thumbnail}
                            alt={event.title}
                        />
                        <Carousel.Caption>
                            <h3  class="border bg-success fs-6" >{event.title}</h3>
                            <p  class="border bg-success text-wrap fs-6" >{event.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Filters */}
            <div className="d-flex align-items-center mb-3 gap-4">
                <div className="d-flex align-items-center gap-2 position-relative">
                    <img src={distanceSVG} alt="Distance" />
                    <Slider value={distance} stepSize={5} setValue={setDistance} tag={`< ${distance} km`}></Slider>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="catSelect"><img src={filterSVG} alt="Filter" /></label>
                    <Form.Select id="catSelect" onChange={e => setCategory(e.target.value)}>
                        <option key="all" value="all">All categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="eventSearch"><img src={searchSVG} alt="Search" /></label>
                    <Form.Control id="eventSearch" value={query} onChange={e => setQuery(e.target.value)} />
                </div>
            </div>

            {/* Event Grid */}
            <EventGrid data={filteredData} />
        </MyContainer>
    );
}
