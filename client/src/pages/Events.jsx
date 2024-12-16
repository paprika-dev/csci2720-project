import { useState, useMemo, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { EventGrid } from "../components/EventGrid";
import { MyContainer } from "../components/MyContainer";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import filterSVG from "../assets/filter.svg";
import searchSVG from "../assets/search.svg";
import { useNavigate } from "react-router-dom";

export default function Events() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [suggestedCount, setSuggestedCount] = useState(10); // Number of random suggestions

    const navigate = useNavigate(); // For navigation to event details

    const eventsDataURL = "http://127.0.0.1:5000/front_end_testing_all_events";
    useEffect(() => {
        fetch(eventsDataURL)
            .then((res) => res.json())
            .then((d) => setData(d));
    }, []);

    const filteredData = useMemo(
        () =>
            data.filter((event) => {
                const eventTitle = event.title?.toLowerCase() || "";
                const eventId = event.id?.toString().toLowerCase() || "";
                const eventLid = event.lid?.toString().toLowerCase() || "";
                const searchQuery = query?.toLowerCase() || "";

                return (
                    eventTitle.includes(searchQuery) ||
                    eventId.includes(searchQuery) ||
                    eventLid.includes(searchQuery)
                );
            }),
        [data, query]
    );

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    }, [filteredData, sortOrder]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Randomly select suggested events
    const suggestedEvents = useMemo(() => {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, suggestedCount);
    }, [data, suggestedCount]);

    // Handle search query changes
    const handleSearchChange = (newQuery) => {
        setQuery(newQuery);
        setCurrentPage(1); // Reset current page to 1 whenever the search query changes
    };

    return (
        <MyContainer>
            {/* Top Banner */}
            <div>
                <h1>Event list</h1>
            
            </div>

            {/* Filters */}
            <div className="d-flex align-items-center mb-3 gap-4">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="eventSearch">
                        <img src={searchSVG} alt="Search" />
                    </label>
                    <Form.Control
                        id="eventSearch"
                        value={query}
                        placeholder="Title/LocID/EvtID"
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <div>
                    <Form.Select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Sort by Title: A-Z</option>
                        <option value="desc">Sort by Title: Z-A</option>
                    </Form.Select>
                </div>
            </div>
            <p>Total Results: {sortedData.length}</p>

            {/* Suggested Events Carousel */}
            <h3>Suggested Events</h3>
            <div className="mb-4">
                <Carousel className="event-container bg-primary bg-gradient">
                    {suggestedEvents.map((event) => (
                        <Carousel.Item
                            key={event.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSearchChange(event.id.toString())} // Set query to event.id
                        >
                            <div style={{ textAlign: "center", padding: "2rem" }} className="text-white">
                                <h5>{event.title}</h5>
                                <p>
                                    <strong>Date:</strong> {event.predate || "N/A"} <br />
                                    <strong>ID:</strong> {event.id || "N/A"}
                                </p>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <EventGrid data={paginatedData} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <Pagination>
                        <Pagination.First
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            First
                        </Pagination.First>
                        <Pagination.Prev
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                            onClick={() =>
                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                            }
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Pagination.Next>
                        <Pagination.Last
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            Last
                        </Pagination.Last>
                    </Pagination>
                </div>
            )}
        </MyContainer>
    );
}
