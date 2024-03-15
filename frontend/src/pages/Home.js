import GoalForm from "../components/GoalForm";
import GoalData from "../components/GoalData";

const Home = () => {
  return (
    <div className="home">
      <div className="goals_">
        <h1>Feed</h1>
      </div>
      <div className="goals">
        <GoalForm />
        <GoalData />
      </div>
    </div>
  );
}; 

export default Home;