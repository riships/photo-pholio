import React, { useCallback, useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Button, Col } from 'react-bootstrap';
import ImageViewer from 'react-simple-image-viewer';


function ImagesList({ selectedAlbumId, albumName }) {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagesList, setImagesList] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

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
    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    useEffect(() => {
        getAlbumById(selectedAlbumId)
    }, [selectedAlbumId])


    const imageUrls = imagesList.map((image) => image.url);



    return (
        <>
            {formVisibility && <ImageForm id={selectedAlbumId} name={albumName} />}
            <Col md={6} sm={6} className='text-start'>
                <h3 className='ps-4 my-3'>Your Image</h3>
            </Col>
            <Col md={6} sm={6} className='text-end'>
                <Button className='my-3' variant={formVisibility ? 'danger' : 'primary'}
                    onClick={() => setFormVisibility(!formVisibility)}
                    type='button'>{formVisibility ? 'Cancel' : 'Add Image'}
                </Button>
            </Col>
            {imagesList.map((image, index) => {
                const { id, url, title } = image
                return (
                    <Col md={6} sm={6}>
                        <img key={id}
                            src={url}
                            onClick={() => openImageViewer(index)}
                            width="300" s
                            style={{ margin: '2px' }}
                            alt={title}
                        />
                    </Col>
                )
            }
            )}
            {
                isViewerOpen && (
                    <ImageViewer
                        src={imageUrls}
                        currentIndex={currentImage}
                        disableScroll={false}
                        closeOnClickOutside={true}
                        onClose={closeImageViewer}
                    />
                )
            }
        </>
    )
}

export default ImagesList