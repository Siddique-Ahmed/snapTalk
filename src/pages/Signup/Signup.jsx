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
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const provider = new GoogleAuthProvider();

const Signup = () => {
  const { changeMood } = useContext(moodChangeContext);
  const navigate = useNavigate();

  // create user account with form //
  const createUserAccount = (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const userEmail = e.target[1].value;
    const userpassword = e.target[2].value;
    const signupButton = e.target[3];
    signupButton.innerHTML = "Loading...";
    signupButton.disabled = true;

    // signup with email and password //
    createUserWithEmailAndPassword(auth, userEmail, userpassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const userObj = {
          fullName: "",
          userEmail: userEmail,
          isActive: true,
          provider: "form",
          userId: user.uid,
          createdAt: serverTimestamp(),
          lasSeen: serverTimestamp(),
          userProfile: "",
          userBackgroundImg: "",
          username: username,
          bio: "",
          isFollow: false,
        };

        try {
          signupButton.innerText = "Signup";
          signupButton.disabled = false;
          toast.success("account created successfully!");
          navigate("/editprofile");
          setDoc(docRef, userObj);
        } catch (error) {
          toast.error(error.message);
        }
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
      </form>
    </div>
  );
};

export default Signup;
