import { Link, useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import "./signup.css";
import { auth, db } from "../../firebaseConfig/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const userSignupData = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const useremail = e.target[1].value;
    const password = e.target[2].value;
    const signupButton = e.target[3];

    const signupObj = {
      username: name,
      email: useremail,
      createdAt: serverTimestamp(),
      fullName: "",
      profileImg: null,
      bgImg: null,
      lastSeen: serverTimestamp(),
      isActive: true,
      uid: null,
      bio: "",
      followers: [],
      following: [],
    };

    signupButton.innerText = "Loading....";
    signupButton.disabled = true;
    try {
      createUserWithEmailAndPassword(auth, useremail, password).then((data) => {
        signupObj.uid = data.user.uid;
        const userRef = doc(db, "users", data.user.uid);
        setDoc(userRef, signupObj);
        signupButton.innerText = "Signup";
        signupButton.disabled = false;
        toast.success("account created successfully");
        navigate("/editprofile");
      });
    } catch (error) {
      toast.error(error.message);
      signupButton.innerText = "Signup";
      signupButton.disabled = false;
    }
  };

  return (
    <div className={`signup`}>
      <form
        onSubmit={(e) => {
          userSignupData(e);
        }}
        className="card"
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
