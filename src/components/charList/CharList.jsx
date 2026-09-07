import { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

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

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  const didFetchRef = useRef(false);

  const onCharListLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }
    setCharList((charList) => [...charList, ...newChars]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  const onRequest = useCallback(
    (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess("confirmed"));
    },
    [getAllCharacters, setProcess, setNewItemLoading],
  );

  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;
    onRequest(offset, true);
  }, [onRequest, offset]);

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }
      const isSelected = item.id === props.selectedId;

      return (
        <li
          key={item.id}
          className={`char__item ${isSelected ? "char__item_selected" : ""}`}
          tabIndex={0}
          onClick={() => props.onCharSelected(item.id)}
          onKeyPress={(e) => {
            if (e.key === " " || e.key === "Enter") {
              props.onCharSelected(item.id);
            }
          }}
        >
          <div className="char__list-img">
            <img
              style={imgStyle}
              src={item.thumbnail}
              alt={item.name}
              loading="lazy"
            />
          </div>
          <p className="char__name">{item.name}</p>
        </li>
      );
    });

    return <ul className="char__list">{items}</ul>;
  };

  return (
    <div className="char__wrapper">
      {setContent(process, () => renderItems(charList), newItemLoading)}
      <button
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};
CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
};

export default CharList;
