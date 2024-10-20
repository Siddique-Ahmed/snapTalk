import "./otherUserProfile.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";
import { db } from "../../firebaseConfig/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faMessage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

const OtherUserProfile = ({ id }) => {
  const [otherData, setOthersData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(true);

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
                  {isFollowing ? (
                    <>
                                     <Link to={`/chatbox/${id}`}>
                      <button className="btn btn-primary">
                        <FontAwesomeIcon icon={faMessage} /> Message
                      </button>
                    </Link>
                    <button className="btn">
                      <FontAwesomeIcon icon={faFeed} /> following
                    </button>
                    </>
                  ) : (
                    <button className="btn btn-primary">
                      <FontAwesomeIcon icon={faFeed} /> Follow Me
                    </button>
                  )}
                </div>
                <div className="profile-button">
                  <button className="btn">
                    <p>{data.followers.length}</p>
                    <h4>Follower</h4>
                  </button>
                  <button className="btn">
                    <p>{data.following.length}</p>
                    <h4>Following</h4>
                  </button>
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
