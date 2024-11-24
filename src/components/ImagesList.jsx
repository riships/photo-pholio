import React, { useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Button, Col } from 'react-bootstrap';
import ImageGalleryComponent from './ImageGalleryComponent';

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
            <ImageGalleryComponent imagesList={imagesList} />
        </>
    )
}

export default ImagesList