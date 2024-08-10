import React from "react";
import loader from "../../Assets/images/loader.gif";

const Loading = ({ fullSize }) => {
  return (
    <img
      alt="Loader"
      className="object-contain"
      style={{
        width: "3%",
        ...(fullSize && { width: "100%", height: "100%" }),
      }}
      src={loader}
    />
  );
};

export default Loading;
