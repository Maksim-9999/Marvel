import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import "./charInfo.scss";

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = useCallback(() => {
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  }, [charId, getCharacter, clearError, setProcess]);

  useEffect(() => {
    updateChar();
  }, [updateChar]);

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  let imgStyle = { objectFit: "cover" };
  if (thumbnail === "") {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <div className="char__img">
          <img src={thumbnail} alt={name} style={imgStyle} />
        </div>

        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
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
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.slice(0, 10).map((item, i) => {
          if (i > 1) return;
          return (
            <li key={i} className="char__comics-item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.string,
};

export default CharInfo;
