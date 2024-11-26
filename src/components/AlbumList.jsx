import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import folderLogo from '../Assets/Images/folder-logo.png'
import AlbumForm from './AlbumForm'
import style from '../styles/album.module.css'
import ImagesList from './ImagesList'

function AlbumList({ albums, albumSubmitedData }) {
    const [formVisibility, setFormVisibility] = useState(false)
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);
    const [albumName, setAlbumName] = useState('');

    const handleAlbumClick = (albumId, name) => {
        if (albumId) {
            setSelectedAlbumId(albumId);
        }
        if (name) {
            setAlbumName(name)
        }
    }

    return (
        <>

            <Container>
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
                            {
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