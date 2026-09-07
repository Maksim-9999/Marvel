import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./singleComicLayout.scss";

const SingleComicLayout = ({ data }) => {
  const { title, description, pageCount, thumbnail, language, price } = data;

  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>
      <div className="single__comic">
        <div className="single__comic-img">
          <img src={thumbnail} alt={title} className="single-comic__img" />
        </div>
        <div className="single__comic-info">
          <h2 className="single__comic-name">{title}</h2>
          <p className="single__comic-descr">{description}</p>
          <p className="single__comic-descr">{pageCount}</p>
          <p className="single__comic-descr">Language: {language}</p>
          <div className="single__comic-price">{price}</div>
        </div>
        <Link to="/comics" className="single__comic-back">
          Back to all
        </Link>
      </div>
    </>
  );
};

export default SingleComicLayout;
