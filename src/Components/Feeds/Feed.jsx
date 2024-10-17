import "./feeds.css";
import userLogo from "../../../public/img/user-dp.jpeg";
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

const Feed = ({ postData }) => {
  const [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {postData.map((data, ind) => {
        return (
          <>
            <div key={ind} className="feed">
              <div className="top-content">
                <Link to={`profile/id`}>
                  <div className="user">
                    <img src={userLogo} alt="" />
                    <div>
                      <h5>Siddique Ahmed</h5>
                      <small>{data.createdAt.seconds}</small>
                    </div>
                  </div>
                </Link>
                <span>
                  <FontAwesomeIcon icon={faListDots} />
                </span>
              </div>
              <div className="mid-content">
                <p>{data.title ? data.title : ""}</p>
                {data.postImg  ? <img src={data.postImg ? data.postImg : ""} alt="" /> : ""}
                {data.postVideo  ? <video src={data.postVideo ? data.postVideo : ""} alt="" loop autoPlay /> : ""}
              </div>
              <div className="bottom-content">
                <div className="action-item">
                  <span>
                    <FontAwesomeIcon icon={faHeart} /> 12 Like
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
          </>
        );
      })}
    </>
  );
};

export default Feed;
