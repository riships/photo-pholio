import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import { db } from "./firebaseInit";
import { addDoc, collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import ImageForm from "./components/ImageForm";

function App() {
  const [albums, setAlbums] = useState([])
  const [imagesListComponent, setImagesListComponent] = useState('')

  useEffect(() => {
    getAlbumsFromDb();
  }, []);


  async function getAlbumsFromDb() {
    let albumsData = await getDocs(collection(db, 'albums'));
    const newAlbums = [];

    albumsData.forEach((doc) => {
      newAlbums.push({ id: doc.id, ...doc.data() });
    });

    setAlbums([...albums, ...newAlbums]); // Spread existing albums and new ones
  }


  async function albumSubmitedData(title) {
    let docRef = await addDoc(collection(db, 'albums'), { title: title })
    onSnapshot(doc(db, 'albums', docRef.id), (snapshot) => {
      setAlbums([...albums, { id: snapshot.id, ...snapshot.data() }])
    });
  }

  async function getAlbumById(id) {
    try {
      // Create a query to fetch documents where 'albumId' matches the given ID
      let galleryData = [];
      const galleryQuery = query(
        collection(db, 'gallery'),
        where('albumId', '==', id)
      );

      // Execute the query
      const querySnapshot = await getDocs(galleryQuery);

      // Iterate through the results and log each document's data
      querySnapshot.forEach((doc) => {
        galleryData.push({ id: id, ...doc.data() })
      });

      if (querySnapshot.empty) {
        console.log('No matching documents found.');
      }

    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  }



  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AlbumList getAlbumId={getAlbumById} albumSubmitedData={albumSubmitedData} albums={albums} />} />
      </Routes>
    </>
  );
}

export default App;
