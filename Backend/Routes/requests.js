import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const router = express.Router();

import Interview from "../Schema/Interview.js";
import User from "../Schema/User.js";
import e from "express";

router.get("/", async (req, res) => {
  try {
    const data = await Interview.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Create the post.
router.post("/create", async (req, res) => {
  const data = req.body;
  console.log(req.body.startDate);
  // console.log("data");
  // console.log(data);
  // res.send(data);
  const startHours = +data.startTime.slice(0, 2);
  const startMin = +data.startTime.slice(3);
  const endHours = +data.endTime.slice(0, 2);
  const endMin = +data.endTime.slice(3);
  const intStartTime = startHours * 100 + startMin;
  const intEndTime = endHours * 100 + endMin;
  const newInterview = new Interview({
    startTime: data.startTime,
    endTime: data.endTime,
    startDate: data.startDate.substr(0, 10),
    interviewees: data.interviewees,
  });

  let temp = 0;
  let user = 0;
  for (let i = 0; i < data.interviewees.length; i++) {
    const findDates = await User.findOne({
      email: data.interviewees[i],
    });
    if (findDates) {
      // console.log(findDates);
      for (let i = 0; i < findDates.startHours.length; i++) {
        if (findDates.startDate[i] == data.startDate) {
          // console.log(temp);
          const userStartTime =
            findDates.startHours[i] * 100 + findDates.startMin[i];
          const userEndTime = findDates.endHours[i] * 100 + findDates.endMin[i];
          if (intStartTime <= userStartTime && intEndTime > userStartTime) {
            user = findDates.email;
            temp = findDates;
            break;
          }
          if (intStartTime >= userStartTime && intStartTime <= userEndTime) {
            user = findDates.email;
            temp = findDates;
            break;
          }
        }
      }
    }
  }
  if (temp != 0) {
    console.log(user);
    res.status(200).send({ Message: user + " is Busy at this time." });
  } else {
    const createInterview = await newInterview.save();
    // console.log(createInterview);

    let userInterviews = [];
    for (let i = 0; i < data.interviewees.length; i++) {
      const findDates = await User.findOne({
        email: data.interviewees[i],
      });
      if (findDates) {
        let startDate1 = findDates.startDate;
        let startHours1 = findDates.startHours;
        let endHours1 = findDates.endHours;
        let startMin1 = findDates.startMin;
        let endMin1 = findDates.endMin;
        startDate1.push(data.startDate);
        startHours1.push(startHours);
        endHours1.push(endHours);
        endMin1.push(endMin);
        startMin1.push(startMin);
        const updateInterview = await User.findOneAndUpdate(
          { email: findDates.email },
          {
            startDate: startDate1,
            startHours: startHours1,
            endHours: endHours1,
            startMin: startMin1,
            endMin: endMin1,
          },
          {
            new: true,
          }
        );
      } else {
        const newUserInterview = new User({
          email: data.interviewees[i],
          startHours: startHours,
          endHours: endHours,
          startMin: startMin,
          endMin: endMin,
          startDate: data.startDate,
        });
        const userInterview = newUserInterview.save();
        userInterviews.push(userInterview);
      }
    }
    res.status(200).send({
      Message: `Saved the interview`,
      interview: createInterview,
      userInterview: userInterviews,
    });
  }
});

// Update the Interview.
router.post("/change", async (req, res) => {
  const data = req.body;
  // console.log("data");
  // console.log(data);
  // res.send(data);
  const startHours = +data.startTime.slice(0, 2);
  const startMin = +data.startTime.slice(3);
  const endHours = +data.endTime.slice(0, 2);
  const endMin = +data.endTime.slice(3);
  const intStartTime = startHours * 100 + startMin;
  const intEndTime = endHours * 100 + endMin;
  await Interview.deleteOne({ _id: data._id });
  const newInterview = new Interview({
    startTime: data.startTime,
    endTime: data.endTime,
    startDate: data.startDate.substr(0, 10),
    interviewees: data.interviewees,
  });

  let temp = 0;
  let user = 0;
  for (let i = 0; i < data.interviewees.length; i++) {
    const findDates = await User.findOne({
      email: data.interviewees[i],
    });
    if (findDates) {
      // console.log(findDates);
      for (let i = 0; i < findDates.startHours.length; i++) {
        if (findDates.startDate[i] == data.startDate) {
          // console.log(temp);
          const userStartTime =
            findDates.startHours[i] * 100 + findDates.startMin[i];
          const userEndTime = findDates.endHours[i] * 100 + findDates.endMin[i];
          if (intStartTime <= userStartTime && intEndTime > userStartTime) {
            user = findDates.email;
            temp = findDates;
            break;
          }
          if (intStartTime >= userStartTime && intStartTime <= userEndTime) {
            user = findDates.email;
            temp = findDates;
            break;
          }
        }
      }
    }
  }
  if (temp != 0) {
    // console.log(user);
    res.status(200).send({ Message: user + " is Busy at this time." });
  } else {
    const createInterview = await newInterview.save();
    // console.log(createInterview);

    let userInterviews = [];
    for (let i = 0; i < data.interviewees.length; i++) {
      const findDates = await User.findOne({
        email: data.interviewees[i],
      });
      if (findDates) {
        let startDate1 = findDates.startDate;
        let startHours1 = findDates.startHours;
        let endHours1 = findDates.endHours;
        let startMin1 = findDates.startMin;
        let endMin1 = findDates.endMin;
        startDate1.push(data.startDate);
        startHours1.push(startHours);
        endHours1.push(endHours);
        endMin1.push(endMin);
        startMin1.push(startMin);
        const updateInterview = await User.findOneAndUpdate(
          { email: findDates.email },
          {
            startDate: startDate1,
            startHours: startHours1,
            endHours: endHours1,
            startMin: startMin1,
            endMin: endMin1,
          },
          {
            new: true,
          }
        );
      } else {
        const newUserInterview = new User({
          email: data.interviewees[i],
          startHours: startHours,
          endHours: endHours,
          startMin: startMin,
          endMin: endMin,
          startDate: data.startDate,
        });
        const userInterview = newUserInterview.save();
        userInterviews.push(userInterview);
      }
    }
    res.status(200).send({
      Message: `Updated the interview`,
      interview: createInterview,
      userInterview: userInterviews,
    });
  }
});

export default router;
