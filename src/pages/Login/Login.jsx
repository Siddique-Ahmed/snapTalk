import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useContext } from "react";
import { moodChangeContext } from "../../Context/DarkMoodContext";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig/Firebase";
import { collection, getDocs } from "firebase/firestore";

const Login = () => {
  const { changeMood } = useContext(moodChangeContext);
  const navigate = useNavigate();


  // User login with form //
  const handleUserLogin = (e) => {
    e.preventDefault();
    console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    
    toast.success("you're logged in")
    navigate("/")
  })
  .catch((error) => {
    const errorMessage = error.message;
    toast.error(errorMessage)
  });

  };




  return (
    <div className={`login ${changeMood === "dark" ? "darkmood" : ""}`}>
      <form
        onSubmit={(e) => {
          handleUserLogin(e);
        }}
        className={`card ${changeMood === "dark" ? "darkmood" : ""}`}
      >
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
