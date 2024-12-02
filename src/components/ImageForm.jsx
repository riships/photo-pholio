import { addDoc, collection } from 'firebase/firestore';
import React, { useRef } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { db } from '../firebaseInit';
import { toast } from 'react-toastify';

function ImageForm({ name, id }) {
    const imgUrl = useRef(null);
    const imgName = useRef(null);

    async function handleImageAdd(event) {
        event.preventDefault();
        let url = imgUrl.current?.value || '';
        let title = imgName.current?.value || ''

        await addDoc(collection(db, 'gallery'), { albumId: id, title: title, url: url })
        toast.success('Image added Successfullly.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        clearForm()
    }

    function clearForm() {
        imgUrl.current.value = ''
        imgName.current.value = ''
    }

    return (
        <>
            <Col md={12} sm={12} lg={12}>
                <Form onSubmit={(e) => handleImageAdd(e)}>
                    <Form.Group className="my-3 d-flex align-items-end justify-content-center" controlId="albumForm1">
                        <div className="d-flex flex-column w-50 p-3 rounded-4" style={{ 'backgroundColor': '#80808033' }}>
                            <h3 className='text-center'>Add image to {name}</h3>
                            <Form.Label className="me-2">Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image URL"
                                className="me-2 mb-3"
                                ref={imgUrl}
                                style={{ flex: '1' }} // Optional, for responsive width
                            />

                            <Form.Label className="me-2">Image Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image Name"
                                className="me-2"
                                ref={imgName}
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