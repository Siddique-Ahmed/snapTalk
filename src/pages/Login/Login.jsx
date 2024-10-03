import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>SnapTalk Login</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            exercitationem pariatur aliquam suscipit.
          </p>
          <span>Don't Have An Account?</span>
          <Link to={"/signup"}>
          <button className="btn btn-primary">Signup</button>
          </Link>
        </div>
        <form className="right">
          <input type="email" required placeholder="email address" />
          <input type="password" required placeholder="password" />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
