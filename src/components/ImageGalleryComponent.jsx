import React from 'react';
import { Col } from 'react-bootstrap';

const ImageGalleryComponent = ({ imagesList }) => {
    const galleryItems = imagesList.map((image) => ({
        original: image.url,
        thumbnail: image.url, // Optional: You can provide a different thumbnail URL
        description: image.title, // Optional: Add a title or description
    }));

    return (
        <>
            {galleryItems.map((item, index) => (
                <Col md={6} sm={12} lg={6} className="my-3" key={index}>
                    <div style={{ height: '200px', width: '100%' }}>
                        <div items={[item]} />
                    </div>
                </Col>
            ))}
        </>
    );
};

export default ImageGalleryComponent;
