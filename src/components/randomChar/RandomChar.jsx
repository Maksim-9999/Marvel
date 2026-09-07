import { useState, useEffect, useCallback } from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = useCallback(() => {
    clearError();
    // Custom API server only has 20 characters available,
    // so the random ID must stay within that range to avoid a 404
    const id = Math.floor(Math.random() * (21 - 1) + 1);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  }, [clearError, setProcess, getCharacter]);

  useEffect(() => {
    updateChar();
    const timerId = setInterval(() => {
      updateChar();
    }, 6000);
    return () => {
      clearInterval(timerId);
    };
  }, [updateChar]);

  return (
    <div className="randomchar">
      <div className="randomchar__block">{setContent(process, View, char)}</div>

      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button onClick={updateChar} className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, wiki, homepage } = data;

  return (
    <>
      <div className="randomchar__img">
        <img src={thumbnail} alt="Random character" />
      </div>
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a
            href={homepage}
            className="button button__main"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="inner">homepage</div>
          </a>
          <a
            href={wiki}
            className="button button__secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RandomChar;
