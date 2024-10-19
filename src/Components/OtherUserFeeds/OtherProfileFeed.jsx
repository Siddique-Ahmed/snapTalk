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

const OtherProfileFeed = ({ otherPost }) => {
  const [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {otherPost.map((post, ind) => {
        let postDate;
        if (post.createdAt && post.createdAt?.seconds) {
          postDate = new Date(post.createdAt?.seconds * 1000);
        } else {
          postDate = new Date();
        }
        return (
          <div className="feed">
            <div className="top-content">
              <Link to={`profile/${post.uid}`}>
                <div className="user">
                  <img src={post.userImg ? post.userImg : userLogo} alt="" />
                  <div>
                    <h5>{post.username}</h5>
                    <small>{dayjs().to(postDate)}</small>{" "}
                  </div>
                </div>
              </Link>
              <span>
                <FontAwesomeIcon icon={faListDots} />
              </span>
            </div>
            <div className="mid-content">
              <p>{post.title}</p>
              {post.postImg ? (
                <img src={post.postImg ? post.postImg : userLogo} alt="" />
              ) : (
                ""
              )}
              {post.postVideo ? (
                <video
                  src={post.postVideo ? post.postVideo : userLogo}
                  loop
                  autoPlay
                />
              ) : (
                ""
              )}
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
        );
      })}
    </>
  );
};

export default OtherProfileFeed;
