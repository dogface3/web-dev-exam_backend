import { useState } from "react";

const GoalForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
  

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const goal = { title, text };

    const response = await fetch("/api/goal", {
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
      setError(null);

      console.log(json, "success");
      
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>New post</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label></label>
      <input
        type="text"
        placeholder="Write your post here..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <button>Add Post</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
export default GoalForm;