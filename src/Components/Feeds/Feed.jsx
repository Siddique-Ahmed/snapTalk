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

const Feeds = () => {
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

  return (
    <div className="feeds">
      {postData.map((data) => (
        <Feed data={data} key={data.id} />
      ))}
    </div>
  );
};

const Feed = ({ data }) => {
  const [userData, setUserData] = useState({ name: "", profilePic: "" });

  let [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", data.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userInfo = userSnap.data();
        setUserData({
          name: userInfo.username,
          profilePic: userInfo.profilePic,
        });
      }
    };

    fetchUserData();
  }, [data.uid]);

  const postTime = dayjs().to(dayjs.unix(data.time.seconds));

  return (
    <div className="feed" key={data.id}>
      <div className="top-content">
        <Link to={`profile/${data.uid}`}>
          <div className="user">
            <img
              src={userData.profilePic || "default-profile-pic-url"}
              alt=""
            />
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
        <p>{data.postTitle}</p>
        {data.postphoto || data.postvideo ? }
        <img src={data.postphoto} alt="" />
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
  );
};

export default Feeds;
