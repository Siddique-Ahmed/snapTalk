import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import google from "../../assets/img/google-logo.png";
import { useContext } from "react";
import { moodChangeContext } from "../../Context/DarkMoodContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebaseConfig/Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
const provider = new GoogleAuthProvider();

const Signup = () => {
  const { changeMood } = useContext(moodChangeContext);
  const navigate = useNavigate();

  // user signup with form //
  const createUserAccount = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const userEmail = e.target[1].value;
    const userPassword = e.target[2].value;

    if (username.length > 20) {
      toast.error("username must be 20 or lessthan 20 character");
      return;
    }

    await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userId = user.uid
        const userObj = {
          username: username,
          userEmail: userEmail,
          isActive: true,
          provider: "form",
          lastSeen: serverTimestamp(),
          createdAt: serverTimestamp(),
        };
        toast.success("you're loggedin");
        navigate("/");
        const userRef = doc(db, "users",userId);
        await setDoc(userRef, userObj);
      })
      .catch((error) => {
        toast.error(error.message);
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
        <div className="btn google">
          <img src={google} alt="" /> Continue with Google
        </div>
      </form>
    </div>
  );
};

export default Signup;
