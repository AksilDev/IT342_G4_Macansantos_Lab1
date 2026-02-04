import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Page</h2>
      <form>
        <input type="text" placeholder="Username" style={{ display: "block", margin: "10px auto" }} />
        <input type="password" placeholder="Password" style={{ display: "block", margin: "10px auto" }} />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;