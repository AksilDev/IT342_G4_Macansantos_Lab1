import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to clear token will go here later
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to the Dashboard!</h2>
      <p>This is a protected area.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;