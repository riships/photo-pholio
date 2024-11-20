import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import AlbumList from "./components/AlbumList";

function App() {
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    getAlbumsFromDb();
  }, []);

  function getAlbumsFromDb() {
    
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
