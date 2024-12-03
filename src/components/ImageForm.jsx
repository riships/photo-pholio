import React, { useState, useEffect } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ImageForm({ id, handleImageAdd, isEdit, editData, setFormVisibility, setIsEdit }) {
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [imgId, setImgId] = useState('')

    useEffect(() => {
        // Populate form fields in edit mode
        if (isEdit && editData) {
            setUrl(editData[0]?.url || '');
            setTitle(editData[0]?.title || '');
            setImgId(editData[0]?.id || '');
        } else {
            clearForm();
        }
    }, [isEdit, editData]);

    const handleImgSubmission = (e) => {
        e.preventDefault();

        if (!url.trim() || !title.trim()) {
            toast.error('Both fields are required!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
            });
            return;
        }

        toast.success(isEdit ? 'Image updated successfully.' : 'Image added successfully.', {
            position: "top-right",
            autoClose: 5000,
        });

        handleImageAdd({ albumId: id, url, title, id: imgId });
        clearForm();
        setIsEdit(false)
        // setFormVisibility(false)
    };

    const clearForm = () => {
        setUrl('');
        setTitle('');
    };

    return (
        <Col md={12} sm={12} lg={12}>
            <Form onSubmit={handleImgSubmission}>
                <Form.Group
                    className="my-3 d-flex align-items-center justify-content-center"
                    controlId="albumForm1"
                >
                    <div
                        className="d-flex flex-column w-50 p-3 rounded-4"
                        style={{ backgroundColor: '#80808033' }}
                    >
                        <h3 className="text-center">
                            {isEdit ? 'Edit Image' : 'Add Image'} to Album
                        </h3>
                        <Form.Label className="me-2">Image Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Image Name"
                            className="me-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            style={{ flex: '1' }}
                        />
                        <Form.Label className="me-2">Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Image URL"
                            className="me-2 mb-3"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{ flex: '1' }}
                        />

                        <div className="mt-3 d-flex justify-content-center gap-3">
                            <Button
                                type="button"
                                variant="danger"
                                onClick={clearForm}
                            >
                                Clear
                            </Button>
                            <Button type="submit" variant="success">
                                {isEdit ? 'Update' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </Form.Group>
            </Form>
        </Col>
    );
}

export default ImageForm;
