import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${name} character`} />
        <title>{name}</title>
      </Helmet>
      <div className="single__character">
        <div className="single__character-img">
          <img src={thumbnail} alt={name} />
        </div>
        <div className="single__character-info">
          <div className="single__character-wrapper">
            <h2 className="single__character-name">{name}</h2>
            <p className="single__character-descr">{description}</p>
          </div>
          <Link to="/" className="single__character-back">
            Back to all
          </Link>
        </div>
      </div>
    </>
  );
};

export default SingleCharacterLayout;
