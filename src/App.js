import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import { db } from "./firebaseInit";
import { addDoc, collection, doc, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  const [albums, setAlbums] = useState([])

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <AlbumList albumSubmitedData={albumSubmitedData} albums={albums} />
        </>
      )
    }
  ])

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



  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
