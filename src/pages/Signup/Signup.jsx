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
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
const provider = new GoogleAuthProvider();

const Login = () => {
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
        const userObj = {
          username: username,
          userEmail: userEmail,
          isActive: true,
          provider: "form",
          lastSeen: serverTimestamp(),
          createdAt: user.metadata.createdAt,
        };
        toast.success("you're loggedin");
        navigate("/");
        const userRef = collection(db, "users");
        await addDoc(userRef, userObj);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // user signup with google //
  const signupWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        const userObj = {
          username: user.displayName,
          userEmail: user.email,
          isActive: true,
          provider: "google",
          lastSeen: serverTimestamp(),
        };
        toast.success("you're logged in");
        navigate("/");
        const userRef = doc(db, "users", user.uid);
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
        <div onClick={signupWithGoogle} className="btn google">
          <img src={google} alt="" /> Continue with Google
        </div>
      </form>
    </div>
  );
};

export default Login;
