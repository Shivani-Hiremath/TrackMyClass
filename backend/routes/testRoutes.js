const express = require("express");
const Test = require("../models/testModel");
const Student = require("../models/studentModel");

const router = express.Router();


router.post("/create-test", async (req, res) => {
    try {
        const { testName, subject,maxMarks,batchId } = req.body;

        const existingTest = await Test.findOne({ testName });
        if (existingTest) {
            return res.status(400).json({ message: "Test already exists" });
        }


        const newTest = new Test({
            testName,
            subject,
            maxMarks,
            batchId,
        });

        await newTest.save();
        res.status(201).json({ message: "Test registered successfully" });

    } catch (error) {
        console.error("Error registering Tst:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// Fetch students by batchId
router.get("/tests/:batchId", async (req, res) => {
  try {
    const tests= await Test.find({ batchId: req.params.batchId });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tests", error });
  }
});

// Fetch student profile
router.get("/test/:testId", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) return res.status(404).json({ message: "test not found" });
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: "Error fetching test page", error });
  }
});

router.get("/test/:testId/students", async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const students = await Student.find({ batchId: test.batchId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});
router.post("/test/:testId/marks", async (req, res) => {
  const { marks } = req.body; // Array of { studentId, score }
  const { testId } = req.params;

  try {
    for (const mark of marks) {
      await Student.updateOne(
        { _id: mark.studentId },
        {
          $push: {
            marks: { testId, score: mark.score },
          },
        }
      );
    }
    res.status(200).json({ message: "Marks updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating marks", error });
  }
});
module.exports = router;
