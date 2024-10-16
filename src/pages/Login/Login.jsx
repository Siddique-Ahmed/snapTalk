import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  // signin user //
  const signinUser = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const signinButton = e.target[2];

    signinButton.innerHTML = "Loading....";
    signinButton.disabled = true;
    // Signin the user
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        isActive: true,
      });
      signinButton.innerHTML = "Login";
      signinButton.disabled = false;
      toast.success("login successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      signinButton.innerHTML = "Login";
      signinButton.disabled = false;
    }
  };

  return (
    <div className={`login`}>
      <form
        onSubmit={(e) => {
          signinUser(e);
        }}
        className={`card`}
      >
        <h2>SnapTalk Login</h2>
        <input type="email" placeholder="email address" required />
        <input type="password" placeholder="password" required />
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
