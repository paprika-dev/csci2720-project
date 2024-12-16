import { useState, useMemo, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { EventGrid } from '../components/EventGrid';
import { MyContainer } from '../components/MyContainer';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination'; // Import Pagination component
import filterSVG from '../assets/filter.svg';
import searchSVG from '../assets/search.svg';

export default function Events() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [itemsPerPage] = useState(6); // Number of events per page

    // Fetch event data
    const eventsDataURL = "http://127.0.0.1:5000/front_end_testing_all_events"; // to be updated
    useEffect(() => {
        fetch(eventsDataURL)
            .then(res => res.json())
            .then(d => setData(d));
    }, []);

    // Filter events based on inputs (event.id and event.title)
 const filteredData = useMemo(() =>
    data.filter(event => {
        const eventTitle = event.title?.toLowerCase() || ""; // Safely convert title to lowercase
        const eventId = event.id?.toString().toLowerCase() || ""; // Safely convert id to string and lowercase
        const eventLid = event.lid?.toString().toLowerCase() || ""; // Safely convert lid to string and lowercase
        const searchQuery = query?.toLowerCase() || ""; // Safely convert search query to lowercase

        // Check if query matches any of the fields
        return (
            eventTitle.includes(searchQuery) ||
            eventId.includes(searchQuery) ||
            eventLid.includes(searchQuery)
        );
    }),
[data, query]);


    // Calculate the paginated data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage; // Start index of current page
        const endIndex = startIndex + itemsPerPage; // End index of current page
        return filteredData.slice(startIndex, endIndex); // Get the events for the current page
    }, [filteredData, currentPage, itemsPerPage]);

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <MyContainer>
            {/* Top Banner */}
            <div>
                <h1>Event list</h1>
                </div>
            {/* Filters */}
            <div className="d-flex align-items-center mb-3 gap-4">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="eventSearch"><img src={searchSVG} alt="Search" /></label>
                    <Form.Control id="eventSearch" value={query} placeholder="Title/LocID/EvtID" onChange={e => setQuery(e.target.value)} />
                </div>
            </div>

            {/* Event Grid */}
            <EventGrid data={paginatedData} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.Prev
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Pagination.Prev>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={currentPage === index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Pagination.Next>
                    </Pagination>
                </div>
            )}
        </MyContainer>
    );
}
