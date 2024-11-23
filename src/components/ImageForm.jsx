import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

function ImageForm() {
    return (
        <>
            <Col md={12} sm={12} lg={12}>
                <Form>
                    <Form.Group className="my-3 d-flex align-items-end justify-content-center" controlId="albumForm1">
                        <div className="d-flex flex-column w-50 p-3 rounded-4" style={{ 'backgroundColor': '#80808033' }}>
                            <Form.Label className="me-2">Add image to </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Album Name"
                                className="me-2"
                                style={{ flex: '1' }} // Optional, for responsive width
                            />

                            <Form.Label className="me-2">Album Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Album Name"
                                className="me-2"
                                style={{ flex: '1' }} // Optional, for responsive width
                            />
                            <div className='mt-3 d-flex justify-content-center gap-3'>
                                <Button type="button" variant="danger">Clear</Button>
                                <Button type="submit" variant="success">Save</Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </Col>
        </>
    )
}

export default ImageForm