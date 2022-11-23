import React from "react";
import { useNavigate } from "react-router-dom";
export const DisplayInterview = (props) => {
  const navigate = useNavigate();
  const change = () => {
    localStorage.setItem("_id", props.data._id);
    navigate("/change");
  };
  console.log(props);
  return (
    <div className="portfolio_item">
      <h1>Interview</h1>
      <h3>Date: {props.data.startDate}</h3>
      <h3>Start: {props.data.startTime}</h3>
      <h3>End: {props.data.endTime}</h3>
      {/* <h3>{props.data.interviewees}</h3> */}
      <h2>Participants:</h2>
      <ul>
        {props.data.interviewees?.map((item) => {
          return <li>{item}</li>;
        })}
      </ul>
      <button onClick={change}> Change Schedule</button>
    </div>
  );
};
