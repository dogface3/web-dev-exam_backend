import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoalData = () => {
    const [goalList, setGoalList] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
          // If no token return
          return;
        }
  
        const response = await fetch("/api/goal", {
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
  
      const response = await fetch(`/api/goal/${id}`, {
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
      navigate("/");
    };
  
    // This is the return statement
    return (
      <div>
        <ul className="goallist">
          {goalList.map((goal) => (
            <li key={goal._id}>
              <strong>{goal.title}</strong> 
              <br />
              <span>{goal.text}</span>
              <br />
              <button onClick={() => handleDelete(goal._id)}>Delete</button>
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
};

export default GoalData;