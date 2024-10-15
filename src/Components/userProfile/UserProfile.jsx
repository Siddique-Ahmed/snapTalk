import "./userprofile.css";
import { Link, useParams } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";
import { auth, db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";

const UserProfile = () => {
  
  return (
    <div className="userProfile">
        <>
          <div className="cover-photos">
            <img src={bgCover} alt="Background" />
          </div>
          <div className="profile-info">
            <img src={userLogo} alt="Profile" />
            <div className="user-name">
              <h3>Siddique</h3>
              <h5>sidique12</h5>
            </div>
            <div className="profile-button">
                <Link to={"/chatbox/id"}>
                  <button className="btn btn-primary">
                    <FontAwesomeIcon icon={faMessage} /> Message
                  </button>
                </Link>
                <Link to={"/editProfile"}>
                  <button className="btn">Edit Profile</button>
                </Link>
                {/* <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faFeed} /> Follow Me
                </button> */}
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faLink} />
              </button>
            </div>
            <p className="bio">helllo everyone</p>
          </div>
        </>
    </div>
  );
};

export default UserProfile;
