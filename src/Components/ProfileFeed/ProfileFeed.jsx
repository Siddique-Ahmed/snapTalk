import "./profileFeed.css";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import usericon from "../../../public/img/user-dp.jpeg";

const ProfileFeed = ({user}) => {
  const [openComment, setOpenComment] = useState(false);
  

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
        <div className="feed">
          <div className="top-content">
            <Link to={`profile/id`}>
              <div className="user">
                <img
                  src={usericon}
                  alt=""
                />
                <div>
                  <h5>Siddique Ahmed</h5>
                  <small>12 mint ago</small>
                </div>
              </div>
            </Link>
            <span>
              <FontAwesomeIcon icon={faListDots} />
            </span>
          </div>
          <div className="mid-content">
            <p>gulabo</p>
              <img src={usericon} alt="post image" />
          </div>
          <div className="bottom-content">
            <div className="action-item">
              <span>
                <FontAwesomeIcon icon={faHeart} /> 14 Like
              </span>
            </div>
            <div onClick={commentHandler} className="action-item">
              <span>
                <FontAwesomeIcon icon={faComment} /> 23 Comment
              </span>
            </div>
            <div className="action-item">
              <span>
                <FontAwesomeIcon icon={faShare} /> 2 Share
              </span>
            </div>
          </div>
          {openComment && <Comments />}
        </div>
    </>
  );
};

export default ProfileFeed;
