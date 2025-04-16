import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTest = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    testName: "",
    subject: "",
    maxMarks: 0,
    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://trackmyclass-backend.onrender.com/tests/create-test", { ...formData, batchId });
      navigate(`/batch/${batchId}`); // Redirect back to batch page
    } catch (error) {
      console.error("Error registering test:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register Student for Batch {batchId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="testName" placeholder="Test Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="subject" placeholder="Subject" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="number" name="maxMarks"placeholder="Maximum Marks" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Create</button>
      </form>
    </div>
  );
};

export default CreateTest;
