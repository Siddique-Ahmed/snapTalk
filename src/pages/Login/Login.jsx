import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <form className="card">
        <h2>SnapTalk Login</h2>
        <input type="email" required placeholder="email address" />
        <input type="password" required placeholder="password" />
        <span>
          Don't Have An Account? <Link to={"/signup"}>Signup</Link>
        </span>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
