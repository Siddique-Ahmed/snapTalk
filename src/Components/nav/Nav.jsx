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
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Nav = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDataFromFirebase = async () => {
      try {
        const userCollection = collection(db, "users");
        const querySnapshot = await getDocs(userCollection);
        querySnapshot.forEach((doc) => {
          setData(doc.data());
          
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataFromFirebase();
  }, []);
  console.log(data);
  
  const handleUserLogout = () => {
    const userId = auth.currentUser.uid;

    const userRef = doc(db, "users", userId);
    signOut(auth);
    toast.success("Logout successfully");
    navigate("/login");
    updateDoc(userRef, { isActive: false })
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(errorMessage);
      });
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
          <Link to={"/profile/id"}>
            <div className="user">
              <img
                src={auth.currentUser.photoURL}
                alt=""
              />
              <h4>{data.username}</h4>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
