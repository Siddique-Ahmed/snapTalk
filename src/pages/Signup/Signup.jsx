import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  return (
    <div className="signup">
      <div className="card">
        <div className="left">
          <h2>SnapTalk Signup</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            exercitationem pariatur aliquam suscipit.
          </p>
          <span>Have An Account?</span>
          <Link to={"/login"}>
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
        <form className="right">
          <input type="text" required placeholder="username" />
          <input type="email" required placeholder="email address" />
          <input type="password" required placeholder="password" />
          <button type="submit" className="btn">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
