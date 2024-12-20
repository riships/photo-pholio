import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import folderLogo from '../Assets/Images/folder-logo.png'
import AlbumForm from './AlbumForm'
import style from '../styles/album.module.css'
import { db } from '../firebaseInit'
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material'
import { Link } from 'react-router-dom'

function AlbumList() {
    const [formVisibility, setFormVisibility] = useState(false)
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, 'albums'), (snapshot) => {
            const albumsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAlbums(albumsData);
            setLoading(false);
        });

        return () => unsubscribe(); // Clean up subscription
    }, [])



    async function albumSubmitedData(title) {
        let docRef = await addDoc(collection(db, 'albums'), { title: title })
        onSnapshot(doc(db, 'albums', docRef.id), (snapshot) => {
            setAlbums((prevAlbums) => [...prevAlbums, { id: snapshot.id, ...snapshot.data() }]);
        });

        toast.success('Album added Successfullly.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }
    return (
        <>

            <Container>
                <ToastContainer />
                <Row>
                    {formVisibility ? <Col md={12} sm={12} className='mb-3'>
                        <AlbumForm albumSubmitedData={albumSubmitedData} />
                    </Col> : ''
                    }
                    <Col md={6} sm={6} className='text-start'>
                        <h3 className='ps-4 my-3'>Your albums</h3>
                    </Col>
                    <Col md={6} sm={6} className='text-end'>
                        <Button className='my-3' variant={formVisibility ? 'danger' : 'primary'}
                            onClick={() => setFormVisibility(!formVisibility)}
                            type='button'>{formVisibility ? 'Cancel' : 'Add Album'}
                        </Button>
                    </Col>
                    {loading ?
                        <Col md={12} sm={12}>
                            <Spinner animation="border" role="status" className='mx-auto'>
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                        :
                        albums.map((album) => {
                            return (
                                <Col key={album.id} md={3} sm={4} xs={6}>
                                    <Link to={`/${album.id}`}>
                                        <div className={`d-flex flex-column align-item-center ${style.album}`}>
                                            <img src={folderLogo} alt='album img logo' className='img-fluid p-4' />
                                            <p className='text-black text-center fs-4 fw-bold'>{album.title}</p>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}

export default AlbumList