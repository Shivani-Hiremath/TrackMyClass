// filepath: d:\Students-Management-System-main\frontend\src\components\StudentProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`http://https://trackmyclass-backend.onrender.com/auth/student/${studentId}`);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Student Profile</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Date of Birth:</strong> {student.dob}</p>
      <p><strong>Fees Due:</strong> ₹{student.feesDue}</p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Marks:</h3>
      {student.marks.length === 0 ? (
        <p>No marks available.</p>
      ) : (
        <ul>
          {student.marks.map((mark) => (
            <li key={mark.testId._id}>
              <strong>Test Name:</strong> {mark.testId.testName} - <strong>Score:</strong> {mark.score}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentProfile;
