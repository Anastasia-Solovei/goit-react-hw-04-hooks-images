import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({
  image: { webformatURL, tags, largeImageURL },
  onClick,
}) {
  const onImgClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItemImage}
        onClick={onImgClick}
      ></img>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
