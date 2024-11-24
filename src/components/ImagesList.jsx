import React, { useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Button, Col } from 'react-bootstrap';

import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

function ImagesList({ selectedAlbumId }) {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagesList, setImagesList] = useState([]);

    async function getAlbumById(selectedAlbumId) {
        try {
            // Create a query to fetch documents where 'albumId' matches the given ID
            let galleryData = [];
            const galleryQuery = query(
                collection(db, 'gallery'),
                where('albumId', '==', selectedAlbumId)
            );

            // Execute the query
            const querySnapshot = await getDocs(galleryQuery);

            // Iterate through the results and log each document's data
            querySnapshot.forEach((doc) => {
                galleryData.push({ id: selectedAlbumId, ...doc.data() })
            });

            if (querySnapshot.empty) {
                console.log('No matching documents found.');
            }

            setImagesList(galleryData)

        } catch (error) {
            console.error('Error fetching albums:', error);
        }
    }


    useEffect(() => {
        getAlbumById(selectedAlbumId)
    }, [selectedAlbumId])

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };

    return (
        <>
            {formVisibility && <ImageForm />}
            <Col md={6} sm={6} className='text-start'>
                <h3 className='ps-4 my-3'>Your Image</h3>
            </Col>
            <Col md={6} sm={6} className='text-end'>
                <Button className='my-3' variant={formVisibility ? 'danger' : 'primary'}
                    onClick={() => setFormVisibility(!formVisibility)}
                    type='button'>{formVisibility ? 'Cancel' : 'Add Image'}
                </Button>
            </Col>
            <div className="App">

                {
                    imagesList.map((item, index) => {
                        const { url, id, title } = item
                        return (
                            <LightGallery
                                onInit={onInit}
                                speed={500}
                                plugins={[lgThumbnail, lgZoom]}
                            >
                                <a key={id} href={url}>
                                    <img alt={title} src={url} />
                                </a>
                            </LightGallery>

                        )
                    })
                }
            </div>
        </>
    )
}

export default ImagesList