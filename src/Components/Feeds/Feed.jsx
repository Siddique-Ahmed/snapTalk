import "./feeds.css";
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

const Feed = ({ data }) => {
  const [openComment, setOpenComment] = useState(false);
  const [like, setLike] = useState(0);

  const postTime = data.postTime
    ? dayjs(data.postTime.toDate()).fromNow()
    : "Unknown time";

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  const likeCounter = () => {
    setLike((like) => (like <= 0 ? like + 1 : like - 1));
  };

  return (
    <>
      {data ? (
        <div className="feed" key={data.id}>
          <div className="top-content">
            <Link to={`profile/${data.userId}`}>
              <div className="user">
                <img src={data.userProfile} alt="" />
                <div>
                  <h5>{data.fullName ? data.fullName : "Unknown User"}</h5>
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
              <span onClick={likeCounter}>
                <FontAwesomeIcon style={{color : `${like === 1 ? "red": ""}` }} icon={faHeart} /> {like} Like
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

export default Feed;
