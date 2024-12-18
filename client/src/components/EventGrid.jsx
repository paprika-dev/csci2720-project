import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "../api/axios"; // Axios instance for API calls
import "./EventGrid.css";

export const EventGrid = ({ data }) => {
    const [locations, setLocations] = useState([]); // Store location data
    const [visiblePopup, setVisiblePopup] = useState(null);

    // Fetch location data from the /locations endpoint
    const fetchLocations = async () => {
        try {
            const response = await axios.get("/locations");
            setLocations(response.data); // Store the location data in state
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    // Fetch locations when the component mounts
    useEffect(() => {
        fetchLocations();
    }, []);

    // Toggle the popup visibility
    const togglePopup = (eventId) => {
        setVisiblePopup(visiblePopup === eventId ? null : eventId);
    };

    // Find the location name by matching event.lid with loc.id
    const getLocationName = (lid) => {
        const location = locations.find((loc) => loc.id === lid); // Match loc.id with event.lid
        return location ? location.name : "Unknown Location"; // Return loc.name or a default value
    };

    // Generate the locURL by replacing spaces with hyphens
    const generateLocURL = (name) => {
        if (!name) return "/locations/unknown"; // Handle cases where name is null or undefined
        return "/locations/" + name.replace(/\s+/g, "-");
    };

    return (
        <div className="event-grid" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.map((event) => (
                <div key={event._id} className="event-container">
                    <Card className="event-card">
                        <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Text>id: {event.id}</Card.Text>

                            <div className="d-flex justify-content-between align-items-center text-primary">
                                <Button
                                    variant="primary"
                                    onClick={() => togglePopup(event._id)} // Use _id for identifying the event
                                >
                                    {visiblePopup === event._id ? "Hide Details" : "View Details"}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Popup-like expandable container */}
                    {visiblePopup === event._id && (
                        <div className="popup-container card ">
                            <div className="card-body text-black">
                                <h5>Event Details</h5>
                                <p>
                                    <strong>Date/Time:</strong> {event.predate}<br />
                                    <strong>Program Time:</strong> {event.progtime}<br />
                                    <strong>Presenter:</strong> {event.presenterorg}<br />
                                    <strong>Price:</strong> {event.price || "Free"}<br />
                                    <strong>Agelimit:</strong> {event.agelimit || "-"}<br />
                                    <strong>Description:</strong> {event.desc || "-"}<br />
                                    <strong>Location:</strong>
                                    <Link to={generateLocURL(getLocationName(event.lid))}>
                                        {getLocationName(event.lid)}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
