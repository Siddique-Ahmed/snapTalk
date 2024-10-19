import "./otherUserProfile.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import bgCover from "../../../public/img/bg-cover.png";
import { auth } from "../../firebaseConfig/Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeed, faMessage } from "@fortawesome/free-solid-svg-icons";

const OtherUserProfile = () => {
  return (
    <div className="userProfile">
      <>
        <div className="cover-photos">
          <img src={bgCover} alt="Background" />
        </div>
        <div className="profile-info">
          <img src={userLogo} alt="Profile" />
          <div className="user-name">
            <h3>Siddique Ahmed</h3>
            <h5>siddiqu-1</h5>
          </div>
          <div className="profile-button">
            {auth.currentUser.uid ? (
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
            ) : (
              <>
                <Link to={"/editProfile"}>
                  <button className="btn btn-primary">Edit Profile</button>
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
            )}
          </div>
          <p className="bio">hello</p>
        </div>
      </>
    </div>
  );
};

export default OtherUserProfile;
