// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import axios from "../api/axios";
import { useState, useMemo, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { EventGrid } from "../components/EventGrid";
import { MyContainer } from "../components/MyContainer";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import searchSVG from "../assets/search.svg";

// Function to fetch events from MongoDB (via backend API)
const fetchEventsFromMongoDB = async () => {
    try {
        const response = await axios.get("/events");
        return response.data; // Return the fetched data
    } catch (err) {
        console.error("Error fetching event data:", err);
        throw new Error("Failed to fetch events. Please try again later.");
    }
};

// Function to fetch locations from MongoDB (via backend API)
const fetchLocationsFromMongoDB = async () => {
    try {
        const response = await axios.get("/locations");
        return response.data; // Return the fetched data
    } catch (err) {
        console.error("Error fetching location data:", err);
        throw new Error("Failed to fetch locations. Please try again later.");
    }
};

export default function Events() {
    const [query, setQuery] = useState("");
    const [events, setEvents] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [suggestedCount, setSuggestedCount] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch both events and locations data
                const [eventsData, locationsData] = await Promise.all([
                    fetchEventsFromMongoDB(),
                    fetchLocationsFromMongoDB(),
                ]);

                setEvents(eventsData); // Set the events data
                setLocations(locationsData); // Set the locations data
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Map event.lid to loc.name
    const mapEventsWithLocationNames = useMemo(() => {
        if (!events.length || !locations.length) return [];

        return events.map((event) => {
            const location = locations.find((loc) => loc.id === event.lid); // Match loc.id with event.lid
            return {
                ...event,
                locationName: location ? location.name : "Unknown Location", // Add loc.name to event
            };
        });
    }, [events, locations]);

    // Filter the data based on the search query
    const filteredData = useMemo(() => {
        return mapEventsWithLocationNames.filter((event) => {
            const eventTitle = event.title?.toLowerCase() || "";
            const eventId = event.id?.toString().toLowerCase() || "";
            const locationName = event.locationName?.toLowerCase() || "";
            const searchQuery = query?.toLowerCase() || "";

            return (
                eventTitle.includes(searchQuery) ||
                eventId.includes(searchQuery) ||
                locationName.includes(searchQuery) // Search by location name
            );
        });
    }, [mapEventsWithLocationNames, query]);

    // Sort the filtered data
    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
    }, [filteredData, sortOrder]);

    // Paginate the sorted data
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    // Randomly select suggested events
    const suggestedEvents = useMemo(() => {
        const shuffled = [...events].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, suggestedCount);
    }, [events, suggestedCount]);

    // Handle search query changes
    const handleSearchChange = (newQuery) => {
        setQuery(newQuery);
        setCurrentPage(1); // Reset current page to 1 whenever the search query changes
    };

    return (
        <MyContainer>
            <div>
                <h1>Event List</h1>
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
                        placeholder="evt.Title/evt.ID/Loc.name"
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

            {/* Error or Loading State */}
            {loading && <p>Loading events...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Suggested Events Carousel */}
            {!loading && !error && (
                <>
                    <h3>Suggested Events</h3>
                    <div className="mb-4">
                        <Carousel className="event-container bg-primary bg-gradient h-80" >
                            {suggestedEvents.map((event) => (
                                <Carousel.Item
                                    key={event._id} // Use MongoDB's unique _id
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSearchChange(event.id.toString())}
                                >
                                    <div
                                        style={{ textAlign: "center", padding: "2rem" }}
                                        className="text-white"
                                    >
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
                </>
            )}

            {/* Event Grid */}
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
