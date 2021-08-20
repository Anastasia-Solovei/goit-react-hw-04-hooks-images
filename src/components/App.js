import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import imageGalleryApi from "../services/image-gallery-api";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import GalleryLoader from "./GalleryLoader";
import QueryError from "./QueryError";
import Modal from "./Modal";
import Button from "./Button";

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState("");
  const [status, setStatus] = useState("idle");

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (query === "") {
      return;
    }

    setStatus("pending");
    setPage(1);
    setImages([]);

    imageGalleryApi
      .fetchImages(query, page)
      .then(({ hits }) => {
        if (hits.length < 12) {
          setLoadMore(false);
        }
        setImages((prevState) => {
          return [...prevState, ...hits];
        });
        setStatus("resolved");
        setLoadMore(true);
      })
      .catch((error) => {
        setError(error);
        setStatus("rejected");
      })
      .finally(() => {
        handleScrollDown();
      });
  }, [query, page]);

  const handleOpenModal = (largeImageURL) => {
    setModalImg(largeImageURL);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (status === "idle") {
    return (
      <>
        <Searchbar onSubmit={setQuery} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }

  if (status === "pending") {
    return (
      <>
        <Searchbar onSubmit={setQuery} />
        <GalleryLoader />
      </>
    );
  }

  if (status === "rejected") {
    return (
      <>
        <Searchbar onSubmit={setQuery} />
        <QueryError queryError={error} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }

  if (status === "resolved") {
    return (
      <>
        <Searchbar onSubmit={setQuery} />
        <ToastContainer autoClose={3000} />
        <ImageGallery images={images} onClick={handleOpenModal} />
        {modal && (
          <Modal onClose={handleCloseModal}>
            <img src={modalImg} alt="" />
          </Modal>
        )}
        {loadMore && (
          <Button onClick={() => setPage((prevPage) => prevPage + 1)} />
        )}
      </>
    );
  }
}
