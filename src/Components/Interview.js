import React from "react";
import { useNavigate } from "react-router-dom";
import { DisplayInterview } from "./DisplayInterview";
import { useState, useEffect } from "react";
import axios from "axios";

export const Interview = (props) => {
  const navigate = useNavigate();
  const change = () => {
    navigate("/change");
  };
  const [interviews, setInterview] = useState([{}]);
  const data = [];
  useEffect(() => {
    const fetchInterview = async () => {
      axios.get("http://127.0.0.1:5000/", data).then((inter) => {
        setInterview(inter.data);

        // console.log(inter);
      });
    };
    fetchInterview();

    // console.log(interviews);
  }, []);


  
  return (
    <div className="portfolio_container">
      {interviews
        ? interviews.map((inter) => {
            return <DisplayInterview data={inter} />;
          })
        : console.log("Loading")}
    </div>
  );
};
