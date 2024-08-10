import React from "react";
import Loading from "./Loading";

const ButtonLoader = ({ style }) => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center">
      <div  style={{ height: 30, width: 30, ...style }}>
        <Loading fullSize={true} />
      </div>
    </div>
  );
};

export default ButtonLoader;
