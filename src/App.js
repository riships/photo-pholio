import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import { db } from "./firebaseInit";

function App() {
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    getAlbumsFromDb();
  }, []);


  function getAlbumsFromDb() {
    console.log(db);

  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AlbumList albums={albums} />} />
      </Routes>
    </>
  );
}

export default App;
