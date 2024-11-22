import React from 'react';
import { Button, Form } from 'react-bootstrap';

function ImageForm() {
    return (
        <Form>
            <Form.Group className="my-3 d-flex align-items-end justify-content-center" controlId="albumForm1">
                <div className="d-flex flex-column w-50">
                    <Form.Label className="me-2">Album Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Album Name"
                        className="me-2"
                        style={{ flex: '1' }} // Optional, for responsive width
                    />
                </div>
                <div className="w-25 d-flex justify-content-end gap-3 align-content-end px-3">
                    <Button type="button" variant="danger">Clear</Button>
                    <Button type="submit" variant="success">Save</Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default ImageForm