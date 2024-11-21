import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import folderLogo from '../Assets/Images/folder-logo.png'
import AlbumForm from './AlbumForm'

function AlbumList({ albums, albumSubmitedData }) {
    return (
        <>

            <Container>
                <Row>
                    <Col md={12} sm={12} className='mb-3'>
                        <AlbumForm albumSubmitedData={albumSubmitedData} />
                    </Col>
                    {
                        albums.map((album) => {
                            return (
                                <Col md={6} sm={12}>
                                    <div>
                                        <img src={folderLogo} alt='album img logo' />
                                        <p className='text-white'>{album.title}</p>
                                    </div>
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