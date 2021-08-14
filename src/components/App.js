import React, { Component } from "react";
import imageGalleryApi from "../services/image-gallery-api";

import Searchbar from "./Searchbar";
// import ImageGallery from "./ImageGallery";
// import GalleryLoader from "./GalleryLoader";
// import QueryError from "./QueryError";
// import Modal from "./Modal";
// import Button from "./Button";

class App extends Component {
  state = {
    query: "",
    status: "idle",
    page: 1,
    images: [],
    showLoadMore: false,
    showModal: false,
    error: null,
    modalImgUrl: "",
  };

  //   componentDidUpdate(prevProps, prevState) {
  //     if (prevState.query !== this.state.query) {
  //       this.setState({
  //         status: "pending",
  //         page: 1,
  //         images: [],
  //       });

  //       const { query, page } = this.state;

  //       this.handleFetchImages(query, page);
  //     }
  //   }

  //   handleFetchImages = (query, page) => {
  //     imageGalleryApi
  //       .fetchImages(query, page)
  //       .then(({ hits }) => {
  //         if (hits.length < 12) {
  //           this.setState({
  //             showLoadMore: false,
  //           });
  //         }

  //         this.setState((prevState) => ({
  //           images: [...prevState.images, ...hits],
  //           status: "resolved",
  //           page: prevState.page + 1,
  //           showLoadMore: true,
  //         }));
  //       })
  //       .catch((error) =>
  //         this.setState({
  //           error,
  //           status: "rejected",
  //         })
  //       )
  //       .finally(() => {
  //         this.handleScrollDown();
  //       });
  //   };

  //   formSubmitHandler = (inputValue) => {
  //     this.setState({ query: inputValue });
  //   };

  //   handleOpenModal = (largeImageURL) => {
  //     this.setState({
  //       modalImgUrl: largeImageURL,
  //       showModal: true,
  //     });
  //   };

  //   handleCloseModal = () => {
  //     this.setState({
  //       showModal: false,
  //     });
  //   };

  //   handleLoadMore = () => {
  //     const { query, page } = this.state;
  //     this.handleFetchImages(query, page);
  //   };

  //   handleScrollDown = () => {
  //     window.scrollTo({
  //       top: document.documentElement.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   };

  render() {
    const { images, status, error, showModal, modalImgUrl } = this.state;
    const { formSubmitHandler, handleOpenModal, handleCloseModal } = this;

    if (status === "idle") {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          {/* <ToastContainer autoClose={3000} /> */}
        </>
      );
    }

    if (status === "pending") {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          {/* <GalleryLoader /> */}
        </>
      );
    }

    if (status === "rejected") {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          {/* <QueryError queryError={error} /> */}
          {/* <ToastContainer autoClose={3000} /> */}
        </>
      );
    }

    if (status === "resolved") {
      return (
        <>
          <Searchbar onSubmit={formSubmitHandler} />
          {/* <ImageGallery images={images} onClick={handleOpenModal} />
          {showModal && (
            <Modal onClose={handleCloseModal}>
              <img src={modalImgUrl} alt="" />
            </Modal>
          )}
          <Button onClick={this.handleLoadMore} /> */}
          {/* <ToastContainer autoClose={3000} /> */}
        </>
      );
    }
  }
}

export default App;
