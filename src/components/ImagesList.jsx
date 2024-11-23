import React, { useEffect, useState } from 'react'
import ImageForm from './ImageForm'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseInit';
import { Col } from 'react-bootstrap';

function ImagesList({ selectedAlbumId }) {
    const [formVisibility, setFormVisibility] = useState(false);
    const [imagesList, setImagesList] = useState([]);

    useEffect(() => {
        async function getAlbumById() {
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

            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        }
    }, [selectedAlbumId])
    return (
        <>
            {
                formVisibility ? (
                    <ImageForm />
                ) : (
                    imagesList.map((image) => {
                        const { id, url, title } = image;
                        < Col key={id} >
                            
                        </Col >
                    })

                )
            }
        </>
    )
}

export default ImagesList