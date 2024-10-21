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
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";

dayjs.extend(relativeTime);

const OtherProfileFeed = ({ otherPost }) => {
  const [openComment, setOpenComment] = useState(false);
  const currentUser = auth.currentUser.uid;

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  // add likes in firebase //
  const addLikes = async (postId, data) => {
    try {
      const likesRef = doc(db, "posts", postId);
      if (data.likes.includes(currentUser)) {
        await updateDoc(likesRef, {
          likes: arrayRemove(currentUser),
        });
      } else {
        await updateDoc(likesRef, {
          likes: arrayUnion(currentUser),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
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
          <div key={ind} className="feed">
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
                <span onClick={() => addLikes(post.postId, post)}>
                  <FontAwesomeIcon className={post.likes.includes(currentUser) ? "likes" : ""} icon={faHeart} /> {post.likes.length} Like
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
        );
      })}
    </>
  );
};

export default OtherProfileFeed;
