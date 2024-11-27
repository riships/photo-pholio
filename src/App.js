import React from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumList from "./components/AlbumList";

function App() {
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <AlbumList />
        </>
      )
    }
  ])





  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
