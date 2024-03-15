import { useState } from "react";

const GoalForm = () => {
  const [title, setTitle] = useState("");
  const [description, setText] = useState("");
  const [targetDate, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
  

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const goal = { title, description, targetDate, location };

    const response = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify(goal),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setText("");
      setDate("");
      setLocation("");
      setError(null);

      console.log(json, "success");
      
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New Goal</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label></label>
      <input
        type="text"
        placeholder="Write your description here..."
        onChange={(e) => setText(e.target.value)}
        value={description}
      />
      <label></label>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={targetDate}
      />

      <label></label>
      
      <input
        type="text"
        placeholder="Write your location here..."
        onChange={(e) => setLocation(e.target.value)}
        value={location}
      />

      <button>Add Post</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default GoalForm;