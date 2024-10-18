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
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ProfileFeed = ({ postData }) => {
  const [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {postData?.map((data, ind) => {
        let postDate;
        if (data.createdAt && data.createdAt.seconds) {
          postDate = new Date(data.createdAt.seconds * 1000);
        } else {
          postDate = new Date();
        }
        return (
          <>
            <div key={ind} className="feed">
              <div className="top-content">
                <Link to={`profile/${data.uid}`}>
                  <div className="user">
                    <img src={data.userImg ? data.userImg : usericon} alt="" />
                    <div>
                      <h5>{data.username}</h5>
                      <small>{dayjs().to(postDate)}</small>
                    </div>
                  </div>
                </Link>
                <span>
                  <FontAwesomeIcon icon={faListDots} />
                </span>
              </div>
              <div key={ind} className="mid-content">
                <p>{data.title}</p>
                {data.postImg ? (
                  <img src={data.postImg} alt="post image" />
                ) : (
                  ""
                )}
                {data.postVideo ? (
                  <video src={data.postVideo} alt="post image" autoPlay loop />
                ) : (
                  ""
                )}
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
      })}
    </>
  );
};

export default ProfileFeed;
