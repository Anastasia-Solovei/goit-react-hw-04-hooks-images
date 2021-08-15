import React from "react";
import PropTypes from "prop-types";

import ImageGalleryItem from "../ImageGalleryItem";

import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image) => {
        return (
          <ImageGalleryItem key={image.id} image={image} onClick={onClick} />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
