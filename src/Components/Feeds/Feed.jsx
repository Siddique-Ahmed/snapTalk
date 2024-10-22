import "./feeds.css";
import { useEffect, useState } from "react";
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
import { auth, db } from "../../firebaseConfig/Firebase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

dayjs.extend(relativeTime);

const Feed = ({ postData }) => {
  const [openComment, setOpenComment] = useState(false);
  const [getComment, setGetComment] = useState([]);
  const currentUser = auth.currentUser.uid;

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  useEffect(()=>{
    const getCommentData = async()=>{
      const dataArr = []
      const commentRef = collection(db,"comments");
      const querySnapShot = onSnapshot(commentRef,(snapShot)=>{
        snapShot.forEach((data)=>{
          dataArr.push(data.data());
        })
        setGetComment(dataArr)
      })
      return ()=>{
        querySnapShot
      }
    }
    getCommentData()
  },[])

  // add likes in pos collection //
  const addLikes = async (postId, data) => {
    try {
      const likeRef = doc(db, "posts", postId);
      if (data.likes.includes(currentUser)) {
        await updateDoc(likeRef, {
          likes: arrayRemove(currentUser),
        });
      } else {
        await updateDoc(likeRef, {
          likes: arrayUnion(currentUser),
        });
      }
    } catch (error) {
      console.log(error.message);
    }
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
                <span onClick={() => addLikes(data.postId, data)}>
                  <FontAwesomeIcon className={data.likes.includes(currentUser) ? "likes" : ""} icon={faHeart} /> {data.likes.length} Like
                </span>
              </div>
              <div className="action-item" onClick={commentHandler}>
                <span>
                  <FontAwesomeIcon icon={faComment} /> {getComment.length } Comment
                </span>
              </div>
              <div className="action-item">
                <span>
                  <FontAwesomeIcon icon={faShare} /> 2 Share
                </span>
              </div>
            </div>
            {openComment && <Comments postid={data.postId} />}
          </div>
        );
      })}
    </>
  );
};

export default Feed;
