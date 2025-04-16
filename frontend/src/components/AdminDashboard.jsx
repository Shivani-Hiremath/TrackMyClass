import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await fetch("https://trackmyclass-backend.onrender.com/batches/all");
      const data = await response.json();
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://trackmyclass-backend.onrender.com/batches/${id}`, { method: "DELETE" });
      fetchBatches();
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={() => navigate("/add-batch")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
      >
        Add New Batch
      </button>

      <h2 className="text-2xl font-semibold mb-4">Existing Batches</h2>
      {batches.length > 0 ? (
        <ul>
          {batches.map((batch) => (
            <li key={batch._id} className="card">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{batch.batchName}</p>
                  <p>Batch ID: {batch.batchId}</p>
                  <p>Fee: ₹{batch.batchFee}</p>
                </div>
                <div>
                  <button
                    onClick={() => navigate(`/batch/${batch.batchId}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(batch._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No batches found.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
