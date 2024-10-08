import "./feeds.css";
import { Link } from "react-router-dom";

// Components...............
import Comments from "../Comments/Comments";

// Firebase Firestore
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig/Firebase";

// FontAwesome Icons...............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

// States............
import { useState, useEffect } from "react";

// Dayjs and relativeTime import
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend relativeTime plugin
dayjs.extend(relativeTime);

const Feed = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const postCollection = collection(db, "posts");
    const unsubscribe = onSnapshot(postCollection, async (snapshot) => {
      const data = [];
      for (const doc of snapshot.docs) {
        const post = doc.data();
        post.id = doc.id;
        data.push(post);
      }
      setPostData(data);
    });

    return () => unsubscribe();
  }, []);

  const Feed = ({ data }) => {
    return (
      <>
        {data ? (
          <div className="feed" key={data.id}>
            <div className="top-content">
              <Link to={`profile/${data.uid}`}>
                <div className="user">
                  <img src={img} alt="" />
                  <div>
                    <h5>{userData.name || "Unknown User"}</h5>
                    <small>{postTime}</small>
                  </div>
                </div>
              </Link>
              <span>
                <FontAwesomeIcon icon={faListDots} />
              </span>
            </div>
            <div className="mid-content">
              <p>{data.postTitle ? data.postTitle : null}</p>
              {data.postphoto ? (
                <img src={data.postphoto} alt="" />
              ) : data.postvideo ? (
                <video src={data.postvideo} alt="" autoPlay />
              ) : null}
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
          <p>post not avialable</p>
        )}
      </>
    );
  };
};

export default Feed;
