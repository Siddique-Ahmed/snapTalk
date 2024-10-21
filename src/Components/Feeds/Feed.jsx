import "./feeds.css";
import { useState } from "react";
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
import { auth } from "../../firebaseConfig/Firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Feed = ({ postData }) => {
  const [openComment, setOpenComment] = useState(false);
  const currentUser = auth.currentUser.uid;

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {postData.map((data, ind) => {
        let postDate;
        if (data.createdAt && data.createdAt.seconds) {
          postDate = new Date(data.createdAt.seconds * 1000);
        } else {
          postDate = new Date();
        }

        return (
          <div key={ind} className="feed">
            <div className="top-content">
              <Link
                to={`${
                  data.uid === currentUser
                    ? `profile/${data.uid}`
                    : `otherprofile/${data.uid}`
                }`}
              >
                <div className="user">
                  <img src={data.userImg ? data.userImg : userLogo} alt="" />
                  <div>
                    <h5>{data.username}</h5>
                    <small>{dayjs().to(postDate)}</small>{" "}
                  </div>
                </div>
              </Link>
              <span>
                <FontAwesomeIcon icon={faListDots} />
              </span>
            </div>
            <div className="mid-content">
              <p>{data.title ? data.title : ""}</p>
              {data.postImg ? <img src={data.postImg} alt="" /> : ""}
              {data.postVideo ? (
                <video src={data.postVideo} loop autoPlay />
              ) : (
                ""
              )}
            </div>
            <div className="bottom-content">
              <div className="action-item">
                <spanz>
                  <FontAwesomeIcon icon={faHeart} /> {data.likes.length} Like
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

export default Feed;
