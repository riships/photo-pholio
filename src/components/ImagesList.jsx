import React, { useCallback, useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ImageViewer from 'react-simple-image-viewer';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import backImg from '../Assets/Images/back.png'


function ImagesList() {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagesList, setImagesList] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [albumName, setAlbumName] = useState('')

    const { albumId } = useParams();


    async function getAlbumById(albumId) {
        try {
            // Create a query to fetch documents where 'albumId' matches the given ID
            let galleryData = [];
            const galleryQuery = query(
                collection(db, 'gallery'),
                where('albumId', '==', albumId)
            );

            // Execute the query
            const querySnapshot = await getDocs(galleryQuery);

            // Iterate through the results and log each document's data
            querySnapshot.forEach((doc) => {
                galleryData.push({ id: albumId, ...doc.data() })
            });

            if (querySnapshot.empty) {
                console.log('No matching documents found.');
            }

            setImagesList(galleryData)
            toast.success('Images Loaded Successfullly.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

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
        getAlbumById(albumId)
    }, [albumId])


    const imageUrls = imagesList.map((image) => image.url);

    return (
        <>
            <Container>
                <ToastContainer />
                <Row>
                    {formVisibility && <ImageForm id={albumId} name={albumName} />}
                    <Col md={6} sm={6} className='text-start my-4'>
                        <div className='d-flex align-items-center'>
                            <Link to='/'>
                            <span className='back_icon'><img src={backImg} /></span>
                            </Link>
                            <h3 className='ps-4 my-3'>Images in this album</h3>
                        </div>
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
                            <Col md={3} sm={4}>
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
                </Row>
            </Container>
        </>
    )
}

export default ImagesList