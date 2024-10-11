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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { auth } from "../../firebaseConfig/Firebase";
import usericon from "../../../public/img/user-dp.jpeg";

dayjs.extend(relativeTime);

const ProfileFeed = ({ postData }) => {
  const [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  const postTime = postData.postTime
    ? dayjs(postData.postTime.toDate()).fromNow()
    : "Unknown time";

  return (
    <>
      {postData ? (
        <div className="feed">
          <div className="top-content">
            <Link to={`profile/${postData.userId}`}>
              <div className="user">
                <img
                  src={postData.userProfile ? postData.userProfile : usericon}
                  alt=""
                />
                <div>
                  <h5>
                    {postData.fullName
                      ? postData.fullName
                      : auth.currentUser?.displayName || "Unknown User"}
                  </h5>
                  <small>{postTime}</small>
                </div>
              </div>
            </Link>
            <span>
              <FontAwesomeIcon icon={faListDots} />
            </span>
          </div>
          <div className="mid-content">
            <p>{postData.title ? postData.title : null}</p>
            {postData.img && (
              <img src={postData.img ? postData.img : null} alt="post image" />
            )}

            {postData.video && (
              <video
                src={postData.video ? postData.video : null}
                alt="post video"
                autoPlay
                controls
                playsInline
              />
            )}
          </div>
          <div className="bottom-content">
            <div className="action-item">
              <span>
                <FontAwesomeIcon icon={faHeart} /> 14 Like
              </span>
            </div>
            <div className="action-item" onClick={commentHandler}>
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
      ) : (
        <p>Post not available</p>
      )}
    </>
  );
};

export default ProfileFeed;
