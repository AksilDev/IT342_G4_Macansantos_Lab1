import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Register Account</h2>
      <form>
        <input type="text" placeholder="Username" style={{ display: "block", margin: "10px auto" }} />
        <input type="email" placeholder="Email" style={{ display: "block", margin: "10px auto" }} />
        <input type="password" placeholder="Password" style={{ display: "block", margin: "10px auto" }} />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;