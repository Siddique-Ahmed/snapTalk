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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userID = auth.currentUser.uid;

  // logout user //
  const logoutUser = () => {
    //get data from Firebase //
    try {
      const userRef = doc(db, "users", userID);
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

  useEffect(() => {
    //Get USer Data From Firebase //
    const getUserDataFromFirebase = async () => {
      const docRef = doc(db, "users", userID);
      const dataArr = [];
      await getDoc(docRef).then((data) => {
        dataArr.push(data.data());
        setData(dataArr);
      });
    };

    getUserDataFromFirebase();
  }, []);

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
          {data.map((user, ind) => {
            return (
              <Link key={ind} to={`/profile/${user.uid}`}>
                <FontAwesomeIcon icon={faUser} />
              </Link>
            );
          })}
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
          {data.map((user, ind) => {
            return (
              <Link key={ind} to={`/profile/${user.uid}`}>
                <div className="user">
                  <img
                    src={user.profileImg ? user.profileImg : userLogo}
                    alt=""
                  />
                  <h4>{user.fullName ? user.fullName : user.username}</h4>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
