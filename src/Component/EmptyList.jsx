import React from "react";
import Lottie from "lottie-react";
import Empty from "../lottie/67812-empty-box-animation.json";
const EmptyList = () => {
  return (
    <div>
      <div className="div-center">
        <Lottie
          animationData={Empty}
          loop={true}
          style={{ width: "7em", margin: "auto" }}
        />
        <h5>Empty</h5>
      </div>
    </div>
  );
};
export default EmptyList;
