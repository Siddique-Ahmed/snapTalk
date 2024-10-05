import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import google from "../../assets/img/google-logo.png";
import { useContext, useEffect } from "react";
import { moodChangeContext } from "../../Context/DarkMoodContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig/Firebase";

const Login = () => {
  const { changeMood } = useContext(moodChangeContext);
  const navigate = useNavigate();

  const createUserAccount = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const userEmail = e.target[1].value;
    const userPassword = e.target[2].value;

    if (username.length > 20) {
      toast.error("username must be 20 or lessthan 20 character");
      return;
    }

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        toast.success("account Create Successfully");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className={`signup ${changeMood === "dark" ? "darkmood" : ""}`}>
      <form
        onSubmit={(e) => createUserAccount(e)}
        className={`card ${changeMood === "dark" ? "darkmood" : ""}`}
      >
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
        <button type="submit" className="btn google">
          <img src={google} alt="" /> Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
