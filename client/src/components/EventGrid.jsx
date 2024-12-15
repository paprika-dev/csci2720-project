import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./EventGrid.css"; // Add custom styles for grid layout
import { Link } from "react-router-dom"

export const EventGrid = ({ data }) => {
    const [visiblePopup, setVisiblePopup] = useState(null); // Track which popup is visible

    const togglePopup = (eventId) => {
        // If the clicked event is already open, close it, otherwise open it
        setVisiblePopup(visiblePopup === eventId ? null : eventId);
    };

    return (
        <div className="event-grid" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {data.map(event => (
                <div key={event.id} className="event-container">
                    <Card className="event-card">
                        <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Text>id: {event.id}</Card.Text>

                            <div className="d-flex justify-content-between align-items-center text-primary">
                                <Button
                                    variant="primary"
                                    onClick={() => togglePopup(event.id)}
                                >
                                    {visiblePopup === event.id ? "Hide Details" : "View Details"}
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>

                    {/* Popup-like expandable container */}
                    {visiblePopup === event.id && (
                        <div className="popup-container card ">
                            <div className="card-body text-black">
                                <h5>Event Details</h5>
                                <p>
                                    <strong>Venue:</strong> {event.title}<br />
                                    <strong>Date/Time:</strong> {event.predate}<br />
                                    <strong>Program Time:</strong> {event.progtime}<br />
                                    <strong>Presenter:</strong> {event.presenterorg}<br />
                                    <strong>Price:</strong> {event.price ? event.price: "Free"}<br />
                                    <strong>Agelimit:</strong> {event.agelimit ? event.agelimit: "-"}<br />
                                    <strong>Description:</strong> {event.desc ? event.desc: "-"}<br />
                                    <strong>Location:</strong>
                                    <Link to={"http://localhost:5173/locations/"+"{event.lid}"}>{event.lid}</Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};
