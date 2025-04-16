import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBatch = () => {
  const navigate = useNavigate();
  const [batchName, setBatchName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchFee, setBatchFee] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://https://trackmyclass-backend.onrender.com
/batches/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchName, batchId, batchFee }),
      });
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  return (
    <div>
      <h1>Add Batch</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Batch Name" value={batchName} onChange={(e) => setBatchName(e.target.value)} />
        <input placeholder="Batch ID" value={batchId} onChange={(e) => setBatchId(e.target.value)} />
        <input placeholder="Batch Fee" value={batchFee} onChange={(e) => setBatchFee(e.target.value)} />
        <button type="submit">Create Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
