import { useState, useMemo, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import searchSVG from '../assets/search.svg';
import filterSVG from '../assets/filter.svg';
import distanceSVG from '../assets/distance.svg';
import { EventTable } from '../components/EventTable';
import { Slider } from '../components/Slider';
import { MyContainer } from '../components/MyContainer';

export default function Events() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [distance, setDistance] = useState(50); // Default distance filter (km)
    const [category, setCategory] = useState("all");
    const [likedEvents, setLikedEvents] = useState({});
    const [suggestedEvents, setSuggestedEvents] = useState([]);

    // API endpoint to fetch event data
    const eventsDataURL = "http://127.0.0.1:5000/front_end_testing_all_events"; // Replace with actual endpoint
    const suggestionsDataURL = "http://127.0.0.1:5000/suggested_events"; // Replace with actual suggestion endpoint

    // Fetch event data when the component loads
    useEffect(() => {
        fetch(eventsDataURL)
            .then(res => res.json())
            .then(d => { setData(d); });
    }, []);

    // Fetch suggested events based on user preferences
    useEffect(() => {
        fetch(suggestionsDataURL)
            .then(res => res.json())
            .then(d => { setSuggestedEvents(d); });
    }, []);

    // Handle like button toggle
    const toggleLike = (eventId) => {
        setLikedEvents(prev => ({
            ...prev,
            [eventId]: !prev[eventId], // Toggle the liked state
        }));
    };

    // Filtered event data based on search query, category, and distance
    const filteredData = useMemo(() =>
        data.filter(event =>
            event.title.toLowerCase().includes(query.toLowerCase()) &&
            (category === "all" ? true : event.category.includes(category)) &&
            event.distance <= distance
        ),
        [data, query, category, distance]
    );

    // Extract unique categories for the dropdown
    const categories = [...new Set(data.flatMap(event => event.category))];

    return (
        <MyContainer>
            {/* Filters */}
            <div className='d-flex align-items-center mb-3 gap-4'>
                {/* Distance Slider */}
                <div className='d-flex align-items-center gap-2 position-relative'>
                    <img src={distanceSVG} alt="Distance Filter" />
                    <Slider value={distance} stepSize={5} setValue={setDistance} tag={`< ${distance} km`}></Slider>
                </div>

                {/* Category Filter */}
                <div className='d-flex align-items-center gap-2'>
                    <label htmlFor="catSelect"><img src={filterSVG} alt="Category Filter" /></label>
                    <Form.Select id="catSelect" onChange={e => setCategory(e.target.value)}>
                        <option key="all" value="all">All categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Select>
                </div>

                {/* Search Bar */}
                <div className='d-flex align-items-center gap-2'>
                    <label htmlFor="eventSearch"><img src={searchSVG} alt="Search" /></label>
                    <Form.Control id="eventSearch" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events"></Form.Control>
                </div>
            </div>

            {/* Event Table */}
            <EventTable data={filteredData} toggleLike={toggleLike} likedEvents={likedEvents} />

            {/* Suggested Events */}
            <div className="mt-5">
                <h4>Suggested Events</h4>
                <EventTable data={suggestedEvents} toggleLike={toggleLike} likedEvents={likedEvents} />
            </div>
        </MyContainer>
    );
}
