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
import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig/Firebase";

dayjs.extend(relativeTime);

const ProfileFeed = ({ data }) => {
  const [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {data ? (
        <div className="feed" >
          <div className="top-content">
            <Link to={`profile/`}>
              <div className="user">
                <img src={data.userProfile} alt="" />
                <div>
                  <h5>
                    {data?.fullName ||
                      auth.currentUser?.displayName ||
                      "Unknown User"}
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
            <p>{data.title ? data.title : null}</p>
            {data.img && <img src={data.img} alt="post image" />}
            {data.video && (
              <video
                src={data.video}
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
