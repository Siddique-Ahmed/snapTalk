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
  const [data, setData] = useState([]);

  // current user profile //
  useEffect(() => {
    const fetchingData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const dataArr = [];
      await getDoc(docRef).then((data) => {
        dataArr.push(data.data());
        setData(dataArr);
      });
    };
    fetchingData();
  }, []);

  return (
    <>
      {data.map((user, ind) => {
        return (
          <div key={ind} className="userProfile">
            <>
              <div className="cover-photos">
                <img src={user.bgImg ? user.bgImg : bgCover} alt="Background" />
              </div>
              <div className="profile-info">
                <img
                  src={user.profileImg ? user.profileImg : userLogo}
                  alt="Profile"
                />
                <div className="user-name">
                  <h3>{user.fullName}</h3>
                  <h5>{user.username}</h5>
                </div>
                <div className="profile-button">
                  {auth.currentUser.uid ? (
                    <>
                      <Link to={"/editProfile"}>
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </Link>
                      <Link>
                        <button className="btn">
                          Followers {" "}
                          <span>333</span>
                        </button>
                      </Link>
                      <Link>
                        <button className="btn btn-primary">
                          Following {" "}
                          <span>33</span>
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to={`/chatbox/id`}>
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faMessage} /> Message
                        </button>
                      </Link>
                      <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faFeed} /> Follow Me
                      </button>
                    </>
                  )}
                </div>
                <p className="bio">{user.bio}</p>
              </div>
            </>
          </div>
        );
      })}
    </>
  );
};

export default UserProfile;
