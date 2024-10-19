import "./otherprofilefeed.css";
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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const OtherProfileFeed = () => {
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
                  <img src={userLogo} alt="" />
                  <div>
                    <h5>Siddique</h5>
                    <small>45mint ago</small>{" "}
                  </div>
                </div>
              </Link>
              <span>
                <FontAwesomeIcon icon={faListDots} />
              </span>
            </div>
            <div className="mid-content">
              <p>Hello</p>
               <img src={userLogo} alt="" />

                <video src={userLogo} loop autoPlay />
            </div>
            <div className="bottom-content">
              <div className="action-item">
                <spanz>
                  <FontAwesomeIcon icon={faHeart} /> 12 Like
                </spanz>
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
};

export default OtherProfileFeed;
