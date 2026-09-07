import "./appBanner.scss";
import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";

const AppBanner = () => {
  return (
    <div className="app__banner">
      <div className="app__banner-img app__banner-heroes">
        <img src={avengers} alt="Avengers" />
      </div>
      <div className="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <div className="app__banner-img">
        <img src={avengersLogo} alt="Avengers logo" />
      </div>
    </div>
  );
};

export default AppBanner;
