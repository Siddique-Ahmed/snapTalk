import { Link } from "react-router-dom";
import "./login.css";
import { useContext } from "react";
import { moodChangeContext } from "../../Context/DarkMoodContext";

const Login = () => {
  const {changeMood} = useContext(moodChangeContext)
  return (
    <div className={`login ${changeMood === "dark" ? "darkmood":""}`}>
      <form className={`card ${changeMood === "dark" ? "darkmood":""}`}>
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
