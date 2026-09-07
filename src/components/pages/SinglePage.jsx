import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const { getComic, getCharacter, clearError, process, setProcess } =
    useMarvelService();

  const onDataLoaded = (data) => {
    setData(data);
  };

  const updateData = useCallback(() => {
    clearError();

    switch (dataType) {
      case "comic":
        getComic(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("confirmed"));
        break;
      default:
        return;
    }
  }, [getComic, getCharacter, setProcess, clearError, dataType, id]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};
SinglePage.propTypes = {
  Component: PropTypes.elementType.isRequired,
  dataType: PropTypes.oneOf(["comic", "character"]).isRequired,
};
export default SinglePage;
