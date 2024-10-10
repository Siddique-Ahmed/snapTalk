import "./userprofile.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";

// Firebase Data....................
import { auth, db } from "../../firebaseConfig/Firebase";
import { useEffect, useState } from "react";

// FontAwesome Icon............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faLink, faMessage } from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";

const UserProfile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      if (!auth.currentUser) {
        return;
      }
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setData(userDoc.data());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataFromFirebase();
  }, []);

  return (
    <div className="userProfile">
      {data && (
        <>
          <div className="cover-photos">
            <img src={data.userBackgroundImg ? data.userBackgroundImg : bgCover} alt="" />
          </div>
          <div className="profile-info">
            <img src={data.userProfile ? data.userProfile : userLogo} alt="" />
            <div className="user-name">
              <h3>{data.fullName}</h3>
              <h5>{data.username}</h5>
            </div>
            <div className="profile-button">
              <Link to={"/chatbox/id"}>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faMessage} />
                </button>
              </Link>
              {data.userId ? (
                <Link to={"/editProfile"}>
                  <button className="btn">Edit Profile</button>
                </Link>
              ) : (
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faFeed} /> Follow Me
                </button>
              )}
              <button className="btn btn-primary">
                <FontAwesomeIcon icon={faLink} />
              </button>
            </div>
            <p className="bio">{data.bio}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
