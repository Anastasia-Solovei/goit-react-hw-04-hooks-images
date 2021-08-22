import { useState, useEffect } from "react";
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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }

    imageGalleryApi
      .fetchImages(query, page)
      .then(({ hits }) => {
        if (hits.length < 12) {
          setLoadMore(false);
        }
        setImages((prevState) => {
          return [...prevState, ...hits];
        });
        setLoadMore(true);
        handleScrollDown();
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoader(false);
      });
  }, [query, page]);

  const formSubmitHandler = (inputValue) => {
    setQuery(inputValue);
    setPage(1);
    setImages([]);
    setLoader(true);
    setLoadMore(false);
    setError(null);
  };

  const handleOpenModal = (largeImageURL) => {
    setModalImg(largeImageURL);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setLoader(true);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      <ToastContainer autoClose={3000} />
      {loader && <GalleryLoader />}
      {error && <QueryError queryError={error} />}
      {images && <ImageGallery images={images} onClick={handleOpenModal} />}
      {modal && (
        <Modal onClose={handleCloseModal}>
          <img src={modalImg} alt="" />
        </Modal>
      )}
      {loadMore && <Button onClick={handleLoadMore} />}
    </>
  );
}
