import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import s from "./GalleryLoader.module.css";

const GalleryLoader = () => {
  return (
    <div className={s.GalleryLoader}>
      <Loader color="#A9A9A9" width="100" height="100" />
      <p className={s.GalleryLoaderText}>Loading...</p>
    </div>
  );
};

export default GalleryLoader;
