import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./EventGrid.css"; // Add custom styles for grid layout

export const EventGrid = ({ data }) => {
    const [likedEvents, setLikedEvents] = useState([]);

    const handleLike = (eventId) => {
        if (likedEvents.includes(eventId)) {
            setLikedEvents(likedEvents.filter(id => id !== eventId));
        } else {
            setLikedEvents([...likedEvents, eventId]);
        }
    };

    return (
        <div className="event-grid" style={{ display: "flex", flexWrap: "wrap" }}>
            {data.map(event => (
                <Card key={event.id} className="event-card">
                    <Card.Img img width={200} height={175} variant="top" src={event.thumbnail} alt={event.title} />
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text>
                            <strong>Venue:</strong> {event.venue}<br />
                            <strong>Date/Time:</strong> {event.dateTime}<br />
                            <strong>Presenter:</strong> {event.presenter}<br />
                            <strong>Price:</strong> {event.price ? `HKD$ ${event.price}` : "Free"}
                        </Card.Text>
                        
                        <div className="d-flex justify-content-between align-items-center">
                            <Button 
                                variant={likedEvents.includes(event.id) ? "danger" : "outline-secondary"} 
                                onClick={() => handleLike(event.id)}
                            >
                                ❤
                            </Button>
                            <Link to={`/events/${event.title}`}>
                                <Button variant="primary">View Details</Button>
                            </Link>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};
