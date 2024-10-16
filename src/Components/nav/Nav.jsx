import "./nav.css";
import { Link, useNavigate } from "react-router-dom";

// Components..............
import DarkMood from "../DarkMood/DarkMood";
import userLogo from "../../../public/img/user-dp.jpeg";

// Firebase................
import { auth, db } from "../../firebaseConfig/Firebase";
import { signOut } from "firebase/auth";

// FontAwesome Icons..............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEnvelope,
  faHome,
  faRightToBracket,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const Nav = () => {
  const navigate = useNavigate();

  // logout user //
  const logoutUser = () => {
    //get data from Firebase //
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      updateDoc(userRef, {
        isActive: false,
      });
      signOut(auth).then(() => {
        toast.success("logout Successfully");
        navigate("/login");
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <div className="nav-container">
        {/*......................NavArea Left *..........................*/}

        <div className="nav-left">
          <Link to="/">
            <h3 className="logo">SnapTalk</h3>
          </Link>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link to={"/profile/id"}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link to={"/searchuser"}>
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </div>

        {/*........................NavArea Right.........................*/}

        <div className="nav-right">
          <Link to={"/chatbox/id"}>
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faBell} />
          </Link>
          <DarkMood />
          <FontAwesomeIcon
            onClick={logoutUser}
            icon={faRightToBracket}
            style={{ cursor: "pointer" }}
          />
          <Link to={`/profile/id`}>
            <div className="user">
              <img src={userLogo} alt="" />
              <h4>Siddique</h4>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
