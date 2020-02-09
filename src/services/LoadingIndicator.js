import {usePromiseTracker} from "react-promise-tracker";
import React from "react";

export const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div style={{textAlign: "center", margin: "30px 0"}}>
      <div className="spinner-border text-warning"/>
    </div>
  );
};