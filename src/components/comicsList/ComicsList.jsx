import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./comicsList.scss";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  const didFetchRef = useRef(false);

  const onComicsLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const onRequest = useCallback(
    (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllComics(offset)
        .then(onComicsLoaded)
        .then(() => setProcess("confirmed"));
    },
    [getAllComics, setProcess],
  );

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    onRequest(offset, true);
  }, [onRequest, offset]);

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <div className="comics__item-img">
              <img src={item.thumbnail} alt={item.title} loading="lazy" />
            </div>
            <div className="comics__item-info">
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price} $</div>
            </div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__list">{items}</ul>;
  }

  return (
    <div className="comics__wrapper">
      {setContent(process, () => renderItems(comicsList), newItemLoading)}
      <button
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={(e) => {
          e.currentTarget.blur();
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
