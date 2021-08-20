import React from "react";
import PropTypes from "prop-types";
import s from "./QueryError.module.css";

const QueryError = ({ queryError }) => {
  return <p className={s.QueryError}>{queryError.message}</p>;
};

QueryError.propTypes = {
  queryError: PropTypes.object,
};

export default QueryError;
