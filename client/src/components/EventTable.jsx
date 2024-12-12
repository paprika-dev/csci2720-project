import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

export function EventTable({ data, toggleLike, likedEvents }) {
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Venue</th>
                    <th>Date/Time</th>
                    <th>Description</th>
                    <th>Presenter</th>
                    <th>Price</th>
                    <th>Like</th>
                </tr>
            </thead>
            <tbody>
                {data.map(event => (
                    <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.title}</td>
                        <td>{event.venue}</td>
                        <td>{event.dateTime}</td>
                        <td>{event.description}</td>
                        <td>{event.presenter}</td>
                        <td>${event.price}</td>
                        <td>
                            <Button
                                variant="link"
                                onClick={() => toggleLike(event.id)}
                                style={{ color: likedEvents[event.id] ? "red" : "grey" }}
                            >
                                <FaHeart />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
