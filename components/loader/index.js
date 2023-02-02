import React from "react";
import loaderImg from "../../public/images/loader-new.gif";

function Loader({ isLoader }) {
  return (
    <div className={isLoader && "loader"}>
      {isLoader && <img className="loader-img" src={loaderImg.src} alt="" />}
    </div>
  );
}

export default Loader;
