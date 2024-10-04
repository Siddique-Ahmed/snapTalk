import { Link } from "react-router-dom";
import "./signup.css";
import google from "../../assets/img/google-logo.png";
import { useContext } from "react";
import { moodChangeContext } from "../../Context/DarkMoodContext";

const Login = () => {
  const { changeMood } = useContext(moodChangeContext);
  return (
    <div className={`signup ${changeMood === "dark" ? "darkmood" : ""}`}>
      <form className={`card ${changeMood === "dark" ? "darkmood" : ""}`}>
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
