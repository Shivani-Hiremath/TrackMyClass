import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TestPage = () => {
  const { testId } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({}); // Store marks for each student

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://https://trackmyclass-backend.onrender.com/tests/test/${testId}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleMarkChange = (studentId, score) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: score,
    }));
  };


  const handleSubmit = async () => {
    const marksArray = Object.entries(marks).map(([studentId, score]) => ({
      studentId,
      score: parseInt(score, 10),
    }));
  
    try {
      console.log("Submitting to URL:", `https://trackmyclass-backend.onrender.com/tests/test/${testId}/marks`);
      console.log("Payload:", marksArray);
      await axios.post(`https://trackmyclass-backend.onrender.com/tests/test/${testId}/marks`, { marks: marksArray });
      alert("Marks submitted successfully!");
    } catch (error) {
      console.error("Error submitting marks:", error);
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Marks for Students</h2>
      {students.length === 0 ? (
        <p>No students found for this batch.</p>
      ) : (
        <form>
          {students.map((student) => (
            <div key={student._id} className="mb-4">
              <label className="block font-medium mb-1">{student.name}</label>
              <input
                type="number"
                placeholder="Enter marks"
                className="border rounded px-2 py-1 w-full"
                value={marks[student._id] || ""}
                onChange={(e) => handleMarkChange(student._id, e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit Marks
          </button>
        </form>
      )}
    </div>
  );
};

export default TestPage;
