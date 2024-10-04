import { Link } from "react-router-dom";
import "./signup.css";
import google from "../../assets/img/google-logo.png";

const Login = () => {
  return (
    <div className="signup">
      <form className="card">
        <h2>SnapTalk Signup</h2>
        <input type="text" required placeholder="username" />
        <input type="email" required placeholder="email address" />
        <input type="password" required placeholder="password" />
        <span>
          Have An Account? <Link to={"/login"}>Login</Link>
        </span>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
        <button className="btn google">
          <img src={google} alt="" /> Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
