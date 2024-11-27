import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import folderLogo from '../Assets/Images/folder-logo.png'
import AlbumForm from './AlbumForm'
import style from '../styles/album.module.css'
import ImagesList from './ImagesList'
import { db } from '../firebaseInit'
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-spinner-material'

function AlbumList({ albumSubmitedData }) {
    const [formVisibility, setFormVisibility] = useState(false)
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [albumName, setAlbumName] = useState('')
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleAlbumClick = (albumId, name) => {
        if (albumId) {
            setSelectedAlbumId(albumId);
        }

        if (name) {
            setAlbumName(name)
        }
    }

    useEffect(() => {
        getAlbumsFromDb();
    }, []);


    async function getAlbumsFromDb() {
        setLoading(true)
        let albumsData = await getDocs(collection(db, 'albums'));
        const newAlbums = [];

        albumsData.forEach((doc) => {
            newAlbums.push({ id: doc.id, ...doc.data() });
        });

        setAlbums([...albums, ...newAlbums]); // Spread existing albums and new ones
        setLoading(false)
        toast.success('Album Loaded Successfullly.', {
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


    async function albumSubmitedData(title) {
        let docRef = await addDoc(collection(db, 'albums'), { title: title })
        onSnapshot(doc(db, 'albums', docRef.id), (snapshot) => {
            setAlbums([...albums, { id: snapshot.id, ...snapshot.data() }])
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
                {selectedAlbumId ?
                    (
                        <Row>
                            <ImagesList albumName={albumName} selectedAlbumId={selectedAlbumId} />
                        </Row>
                    ) : (
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
                                    <Spinner className='mx-auto' animation='border' />
                                </Col>
                                :
                                albums.map((album) => {
                                    return (
                                        <Col key={album.id} md={3} sm={4} xs={6} onClick={() => handleAlbumClick(album.id, album.title)}>
                                            <div className={`d-flex flex-column align-item-center ${style.album}`}>
                                                <img src={folderLogo} alt='album img logo' className='img-fluid p-4' />
                                                <p className='text-black text-center fs-4 fw-bold'>{album.title}</p>
                                            </div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                }

            </Container>
        </>
    )
}

export default AlbumList