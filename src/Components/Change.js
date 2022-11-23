import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Multiselect from "multiselect-react-dropdown";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import axios from "axios";

export const Change = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [interviewees, setInterviewees] = useState([]);
  async function handleSubmit() {
    if (interviewees.length < 2) {
      alert("Atleast 2 interviewees should be there in the meeting.");
      return;
    }
    if (startTime == undefined) {
      alert("Choose Start Time");
      return;
    }
    if (endTime == undefined) {
      alert("Choose End Time");
      return;
    }
    if (startDate == undefined) {
      alert("Choose Start Date");
      return;
    }
    console.log("Sending Request");
    const _id = localStorage.getItem("_id");
    const response = await axios.post("http://127.0.0.1:5000/change", {
      startDate: startDate.toLocaleDateString(),
      endTime: endTime,
      startTime: startTime,
      interviewees: interviewees,
      _id: _id,
    });
    console.log(response);
  }
  return (
    <div className="main">
      <h1>Schedule Your Interview</h1>
      <div className="create">
        <div>
          <h4>Select Date</h4>
          <DatePicker
            className="ip"
            placeholderText="Choose date for meeting"
            selected={startDate}
            onChange={(date) => setStartDate(date.toLocaleDateString())}
            minDate={new Date()}
          />
          <h4> Start Time</h4>
          <TimePicker
            className="ip"
            name="StartTime"
            selected={startTime}
            clockAriaLabel={true}
            TimePicker={true}
            onChange={(value) => setStartTime(value)}
          />
          <h4> End Time</h4>
          <TimePicker
            className="ip"
            name="endTime"
            selected={endTime}
            onChange={(value) => {
              setEndTime(value);
              console.log(startTime);
            }}
          />
          <h4>Select Candidates</h4>
          <Multiselect
            className="ip"
            placeholder="Select the participant"
            isObject={false}
            onSelect={(e) => {
              setInterviewees(e);
              // console.log(interviewees);
            }}
            onRemove={(e) => {
              setInterviewees(e);
              // console.log(interviewees);
            }}
            options={[
              "sudhanshu@gmail.com",
              "sudarshan@gmail.com",
              "praveen@gmil.com",
              "satya@gmail.com",
              "akhilesh@gmail.com",
            ]}
            showCheckbox
          />
          {/* <input className="inputBtn" type={"submit"} /> */}
          <button className="inputBtn" type={"submit"} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
