import React from "react";
import loaderImg from "../../public/images/loader-new.gif";

function Loader({ isLoader }) {
  return (
    <>
      {isLoader && <img className="loader-img" src={loaderImg.src} alt="" />}
    </>
  );
}

export default Loader;
