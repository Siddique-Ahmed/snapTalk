import "./otherUserProfile.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";
import { auth, db } from "../../firebaseConfig/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const OtherUserProfile = ({ id }) => {
  const [otherData, setOthersData] = useState([]);

  useEffect(() => {
    const fetchOthersData = async () => {
      try {
        const otherUserData = [];
        const docRef = doc(db, "users", id);
        await getDoc(docRef).then((data) => {
          otherUserData.push(data.data());
        });
        setOthersData(otherUserData);
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    };
    fetchOthersData();
  }, []);

  return (
    <>
      {otherData.map((data, ind) => {
        return (
          <div key={ind} className="userProfile">
            <>
              <div className="cover-photos">
                <img src={data.bgImg ? data.bgImg : bgCover} alt="Background" />
              </div>
              <div className="profile-info">
                <img
                  src={data.profileImg ? data.profileImg : userLogo}
                  alt="Profile"
                />
                <div className="user-name">
                  <h3>{data.fullName}</h3>
                  <h5>{data.username}</h5>
                </div>
                <div className="profile-button">
                  {!auth.currentUser.uid ? (
                    <>
                      <Link to={"/editProfile"}>
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </Link>
                      <Link>
                        <button className="btn">
                          Followers <span>333</span>
                        </button>
                      </Link>
                      <Link>
                        <button className="btn btn-primary">
                          Following <span>33</span>
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
                <p className="bio">{data.bio}</p>
              </div>
            </>
          </div>
        );
      })}
    </>
  );
};

export default OtherUserProfile;
