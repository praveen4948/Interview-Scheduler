import React from "react";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const change = () => {
    navigate("/");
  };
  const create = () => {
    navigate("/create");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          backgroundColor: "#F5D5AE",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "1%",
            fontFamily: "fantasy",
            fontSize: "150%",
            padding: "1%",
          }}
          onClick={change}
          className="Logo"
        >
          Interview
        </div>
        <div style={{ marginRight: "1%" }}>
          <button
            onClick={create}
            className="SubmitButton"
            style={{ marginLeft: "auto", marginTop: "35%" }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
