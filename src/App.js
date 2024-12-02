import React from "react";
import Navbar from "./components/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import AlbumList from "./components/AlbumList";
import ImagesList from "./components/ImagesList";

function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <AlbumList />,
        },
        {
          path: ':albumId',
          element: <ImagesList />
        }
      ]
    }
  ])





  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
