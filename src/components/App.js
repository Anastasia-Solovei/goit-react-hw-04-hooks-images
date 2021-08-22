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
  const [status, setStatus] = useState(" ");

  useEffect(() => {
    if (query === "") {
      return;
    }

    setStatus("pending");

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

  const formSubmitHandler = (inputValue) => {
    setQuery(inputValue);
    setPage(1);
    setImages([]);
  };

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

  if (status === " ") {
    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ToastContainer autoClose={3000} />
      </>
    );
  }

  // if (status === "idle") {
  //   return (
  //     <>
  //       {/* <Searchbar onSubmit={formSubmitHandler} /> */}
  //       {/* <ToastContainer autoClose={3000} /> */}
  //     </>
  //   );
  // }

  if (status === "pending") {
    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <GalleryLoader />
      </>
    );
  }

  if (status === "rejected") {
    return (
      <>
        {/* <Searchbar onSubmit={formSubmitHandler} /> */}
        <QueryError queryError={error} />
        {/* <ToastContainer autoClose={3000} /> */}
      </>
    );
  }

  if (status === "resolved") {
    return (
      <>
        {/* <Searchbar onSubmit={formSubmitHandler} /> */}
        {/* <ToastContainer autoClose={3000} /> */}
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
