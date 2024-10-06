import "./nav.css";
import { Link, useNavigate } from "react-router-dom";

// Components..............
import DarkMood from "../DarkMood/DarkMood";

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
import { auth, db } from "../../firebaseConfig/Firebase";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Nav = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataFromFirebase = async () => {
      if (!auth.currentUser) {
        return;
      }

      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid); 
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getDataFromFirebase();
  }, []);

  const handleUserLogout = async () => {
    if (!auth.currentUser) {
      return; // Exit if no user is logged in
    }

    const userRef = doc(db, "users", auth.currentUser.uid);

    try {
      await updateDoc(userRef, { isActive: false }); // Update user to inactive
      await signOut(auth); // Sign out user
      toast.success("Logout successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
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
          <div className="Nav-searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" placeholder="Find Friends" />
          </div>
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
            onClick={handleUserLogout}
            icon={faRightToBracket}
            style={{ cursor: "pointer" }}
          />
          {userData && (
            <Link to={`/profile/${auth.currentUser.uid}`}>
              <div className="user">
                <img src={userData.profile} alt="" />
                <h4>{userData.username}</h4>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
