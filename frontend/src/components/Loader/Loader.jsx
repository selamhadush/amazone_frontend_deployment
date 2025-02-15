import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        hight: "50vh",
        // margin: "0 auto",
        //  borderColor: "red",
      }}
    >
      <FadeLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;
