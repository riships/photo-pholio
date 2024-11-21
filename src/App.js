import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import { db } from "./firebaseInit";
import { addDoc, collection } from "firebase/firestore";

function App() {
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    getAlbumsFromDb();
  }, []);


  function getAlbumsFromDb() {

  }


  async function albumSubmitedData(title) {
    let docRef = collection(db, 'albums')
    await addDoc(docRef, { title: title })
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AlbumList albumSubmitedData={albumSubmitedData} albums={albums} />} />
      </Routes>
    </>
  );
}

export default App;
