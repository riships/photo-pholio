import React, { useCallback, useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ImageViewer from 'react-simple-image-viewer';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import backImg from '../Assets/Images/back.png'
import Spinner from 'react-spinner-material';
import { FaPencilAlt } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from '../styles/images.module.css'


function ImagesList() {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagesList, setImagesList] = useState([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [albumName, setAlbumName] = useState('')
    const [loading, setLoading] = useState(false)

    const { albumId } = useParams();


    async function getAlbumById(albumId) {
        try {
            setLoading(true)
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
            setLoading(false)
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
                    <Col md={6} sm={6} xs={9} className='text-start my-4'>
                        <div className='d-flex align-items-center'>
                            <Link to='/'>
                                <span className='back_icon'><img src={backImg} /></span>
                            </Link>
                            <h3 className='ps-4 my-3'>Images in this album</h3>
                        </div>
                    </Col>
                    <Col md={6} sm={6} xs={3} className='text-end'>
                        <Button className='my-3' variant={formVisibility ? 'danger' : 'primary'}
                            onClick={() => setFormVisibility(!formVisibility)}
                            type='button'>{formVisibility ? 'Cancel' : 'Add Image'}
                        </Button>
                    </Col>
                    {
                        loading ? (
                            <Col md={12} sm={12}>
                                <Spinner className="mx-auto" animation="border" />
                            </Col>
                        ) : imagesList.length > 0 ? (
                            imagesList.map((image, index) => {
                                const { id, url, title } = image;
                                return (
                                    <Col md={3} sm={4} key={id}>
                                        <div className={styles.buttons_parents}>
                                            <div className={styles.buttons_child}>
                                                <button className='btn fs-4' type='button'><FaPencilAlt /></button>
                                                <button className='btn fs-4' type='button'><RiDeleteBin6Line /></button>
                                            </div>
                                            <img
                                                src={url}
                                                onClick={() => openImageViewer(index)}
                                                style={{ margin: '2px', width: '100%' }}
                                                alt={title}
                                            />
                                        </div>
                                    </Col>
                                );
                            })
                        ) : (
                            <Col className="text-center fs-3">No Images available</Col>
                        )
                    }

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