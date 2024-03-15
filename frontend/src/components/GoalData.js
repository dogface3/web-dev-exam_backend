import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoalData = () => {
  const [goalList, setGoalList] = useState([]);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setText] = useState("");
  const [targetDate, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);
  const [modifyGoalId, setModifyGoalId] =useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        // If no token return
        return;
      }

      const response = await fetch("/api/goals", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setGoalList(json);
      } else {
        // Handle error
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    if (!token) {
      // Handle the case where the user is not logged in
      return;
    }

    const response = await fetch(`/api/goals/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setGoalList(goalList.filter((goal) => goal.id !== id));
    } else {
      console.log("error", id);
    }
    window.location.reload();
  };


  
  const handleUpdate = async (id, e) => {
    e.preventDefault();
    console.log("id is", id)

    if (!token) {
      setError("You must be logged in");
      return;
    }

    const goal = { title, description, targetDate, location };
    console.log(goal)

    const response = await fetch(`/api/goals/${id}`, {
      method: "PUT",
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
      
      setError(null);

      console.log(json, "success");
      
    }
  };

  const handleModify = (id, title, description, targetDate, location) => {
    setModifyGoalId(id);
    setTitle(title);
    setText(description);
    setDate(targetDate);
    setLocation(location);
  };






  // This is the return statement
  return (
    <div>
      <ul className="goallist">
        {goalList.map((goal) => (
          <li key={goal._id}>
            <strong>{goal.title}</strong>
            <br />
            <span>{goal.description}</span>
            <br />
            <span>{goal.targetDate}</span>
            <br />
            <span>{goal.location}</span>
            <br />
            <button onClick={() => handleDelete(goal._id)}>Delete</button>
            <button onClick={() => handleModify(goal._id, goal.title, goal.description, goal.targetDate, goal.location)}>Update</button>modify
            <br />
            
            {modifyGoalId === goal._id && (
              <form onSubmit={(e) => handleUpdate(modifyGoalId, e)}>
              <h3>modify</h3>

              <label>title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              <label>description</label>
              <input type="text" value={description} onChange={(e) => setText(e.target.value)} />
              <label>date</label>
              <input type="date" value={targetDate} onChange={(e) => setDate(e.target.value)} />
              <label>location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
              
              <button type="submit">Update</button>
              
              </form>
            )}

      


          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalData;
