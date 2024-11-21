import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

function AlbumForm({ albumSubmitedData }) {
    const albumTitle = useRef('')
    function handleFormSubmit(e) {
        e.preventDefault()
        albumSubmitedData(albumTitle.current.value)
        albumTitle.current.value = '';
    }
    return (
        <>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="my-3 d-flex align-items-end" controlId="albumForm1">
                    <div className="d-flex flex-column w-75">
                        <Form.Label className="me-2">Album Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Album Name"
                            className="me-2"
                            ref={albumTitle}
                            style={{ flex: '1' }} // Optional, for responsive width
                        />
                    </div>
                    <div className="w-25 d-flex justify-content-end align-content-end">
                        <Button type="submit" variant="success">Save</Button>
                    </div>
                </Form.Group>
            </Form>

        </>
    )
}

export default AlbumForm