// Group 20
// LIN Yu Hsiang           1155172258
// CHAN Yiu Cheung         1155193060
// CHENG Hing Wai Kristian 1155176902
// CHENG Kwan Wai          1155157943

import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { MyContainer } from '../components/MyContainer';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Button, Form } from 'react-bootstrap';

const AdminEvent = () => {
    const [events, setEvents] = useState([]);
    const [eventFormData, setEventFormData] = useState({ title: '', predate: '', progtime: '', desc: '', agelimit: '', price: '', presenterorg: '', lid: '' });
    const [createEventError, setCreateEventError] = useState('');
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/events');
            const sortedEvents = response.data.sort((a, b) => parseInt(a.id) - parseInt(b.id));
            setEvents(sortedEvents);
        } catch (error) {
            console.error('There was an error fetching the events!', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEventFormData({ ...eventFormData, [name]: value });
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/events', eventFormData);
            alert('Event created successfully');
            fetchEvents();
            setEventFormData({ title: '', predate: '', progtime: '', desc: '', agelimit: '', price: '', presenterorg: '', lid: '' });
            setCreateEventError('');
        } catch (error) {
            console.error(error);
            setCreateEventError(error.response.data.error || 'An error occurred');
        }
    };

    const handleDeleteEvent = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await axios.delete(`/events/${id}`);
            alert('Event deleted successfully');
            fetchEvents();
        } catch (error) {
            console.error('There was an error deleting the event!', error);
        }
    };

    const handleUpdateEvent = async () => {
        try {
            await axios.put(`/events/${selectedEvent._id}`, eventFormData);
            alert('Event updated successfully');
            fetchEvents();
            setEventFormData({ title: '', predate: '', progtime: '', desc: '', agelimit: '', price: '', presenterorg: '', lid: '' });
            setShowEventModal(false);
        } catch (error) {
            console.error('There was an error updating the event!', error);
        }
    };

    const handleUpdateEventButton = (event) => {
        setSelectedEvent(event);
        setEventFormData(event);
        setShowEventModal(true);
    };

    return (
        <MyContainer>
            <div className="container">
                <h2 className="mt-3">All Events Information</h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(events) && events.map((event, index) => (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td>{event.id}</td>
                                    <td>{event.title}</td>
                                    <td>{event.predate}</td>
                                    <td className="text-center align-middle">
                                        <FaTrash onClick={() => handleDeleteEvent(event._id)} style={{ color: 'red', cursor: 'pointer', marginRight: '2px' }} />
                                        <span style={{ fontSize: '20px', fontWeight: 'bold', verticalAlign: 'middle' }}> / </span>
                                        <FaEdit onClick={() => handleUpdateEventButton(event)} style={{ color: 'blue', cursor: 'pointer', marginLeft: '2px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h2 className="mt-5">Create New Event</h2>
                <form onSubmit={handleCreateEvent} className="p-4 border rounded bg-light">
                    <div className="mb-1">
                        <label htmlFor="title"><strong>Title</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            name="title"
                            className="form-control rounded-0"
                            value={eventFormData.title}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="predate"><strong>Date</strong></label>
                        <input
                            type="text"
                            name="predate"
                            className="form-control rounded-0"
                            value={eventFormData.predate}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="progtime"><strong>Program Time</strong></label>
                        <input
                            type="text"
                            name="progtime"
                            className="form-control rounded-0"
                            value={eventFormData.progtime}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="desc"><strong>Description</strong></label>
                        <textarea
                            name="desc"
                            className="form-control rounded-0"
                            value={eventFormData.desc}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="agelimit"><strong>Age Limit</strong></label>
                        <input
                            type="text"
                            name="agelimit"
                            className="form-control rounded-0"
                            value={eventFormData.agelimit}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="price"><strong>Price</strong></label>
                        <input
                            type="text"
                            name="price"
                            className="form-control rounded-0"
                            value={eventFormData.price}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="presenterorg"><strong>Presenter Organization</strong></label>
                        <input
                            type="text"
                            name="presenterorg"
                            className="form-control rounded-0"
                            value={eventFormData.presenterorg}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="lid"><strong>Location ID</strong></label>
                        <input
                            type="text"
                            name="lid"
                            className="form-control rounded-0"
                            value={eventFormData.lid}
                            onChange={handleEventChange}
                            required
                        />
                    </div>
                    {createEventError && <div className="alert alert-danger">{createEventError}</div>}
                    <button type="submit" className="btn btn-primary">Create Event</button>
                </form>
            </div>
            <Modal show={showEventModal} onHide={() => { setShowEventModal(false); setEventFormData({ title: '', predate: '', progtime: '', desc: '', agelimit: '', price: '', presenterorg: '', lid: '' }); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEvent && (
                        <Form>
                            <Form.Group controlId="formEventId">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="id"
                                    defaultValue={selectedEvent.id}
                                    readOnly
                                    style={{ backgroundColor: '#d3d3d3' }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    defaultValue={selectedEvent.title}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="predate"
                                    defaultValue={selectedEvent.predate}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventProgTime">
                                <Form.Label>Program Time</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="progtime"
                                    defaultValue={selectedEvent.progtime}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="desc"
                                    defaultValue={selectedEvent.desc}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventAgeLimit">
                                <Form.Label>Age Limit</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="agelimit"
                                    defaultValue={selectedEvent.agelimit}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    defaultValue={selectedEvent.price}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventPresenterOrg">
                                <Form.Label>Presenter Organization</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="presenterorg"
                                    defaultValue={selectedEvent.presenterorg}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEventLid">
                                <Form.Label>Location ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lid"
                                    defaultValue={selectedEvent.lid}
                                    onChange={handleEventChange}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowEventModal(false); setEventFormData({ title: '', predate: '', progtime: '', desc: '', agelimit: '', price: '', presenterorg: '', lid: '' }); }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateEvent()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </MyContainer>
    );
};

export default AdminEvent;
