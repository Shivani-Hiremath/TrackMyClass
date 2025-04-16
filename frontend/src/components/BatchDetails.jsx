import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BatchDetails = () => {
  const { batchId } = useParams();
  const [batch, setBatch] = useState(null);
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchBatch();
    fetchStudents();
    fetchTests();
  }, []);

  const fetchBatch = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-backend.onrender.com/batches/${batchId}`);
      setBatch(response.data);
    } catch (error) {
      console.error("Error fetching batch details:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-backend.onrender.com/auth/students/${batchId}`);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get(`https://trackmyclass-backend.onrender.com/tests/tests/${batchId}`);
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  if (!batch) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-2xl font-bold mb-4">
          {batch.batchName} - {batch.batchId}
        </h2>
        <p className="mb-4"><strong>Batch Fee:</strong> ₹{batch.batchFee}</p>

        <div className="flex justify-between mb-4">
          <Link
            to={`/register-student/${batchId}`}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            + Register Student
          </Link>
          <Link
            to={`/create-test/${batchId}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            + Create Test
          </Link>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-2">Students in this batch:</h3>
        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id} className="mb-2">
                <Link
                  to={`/student/${student._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {student.name} - {student.email}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-2">Tests in this batch:</h3>
        {tests.length === 0 ? (
          <p>No tests created yet.</p>
        ) : (
          <ul>
            {tests.map((test) => (
              <li key={test._id} className="mb-2">
                <Link
                  to={`/test/${test._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {test.testName} - {test.subject}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BatchDetails;
