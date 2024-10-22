import "./comments.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg";
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig/Firebase";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Comments = ({ postid }) => {
  const [userData, setUserData] = useState([]);
  const [comments, setComments] = useState([]);
  const currentUserID = auth.currentUser.uid;
  const postID = postid;

  // getting user data from firebase //
  useEffect(() => {
    const getUsersData = async () => {
      const dataArray = [];
      const userRef = collection(db, "users");
      await getDocs(userRef).then((obj) => {
        obj.forEach((data) => {
          dataArray.push(data.data());
        });
        setUserData(dataArray);
      });
    };
    getUsersData();
  }, []);

  // getting comment data from Firebase //
  useEffect(() => {
    const gettingCommentData = async () => {
      const commentData = [];
      const commentRef = collection(db, "comments");
      const unsubscribe = onSnapshot(commentRef, (snapshot) => {
        const filteredComments = [];
        snapshot.forEach((data) => {
          const commentData = data.data();
          if (commentData.postid === postID) {
            filteredComments.push({ id: data.id, ...commentData });
          }
        });
        setComments(filteredComments);
      });
      return () => {
        unsubscribe();
      };
    };
    gettingCommentData();
  }, [postID]);

  // add comments in firebase //
  const addComments = async (e) => {
    e.preventDefault();
    const comment = e.target[0].value;
    const button = e.target[1];

    const commentObj = {
      comment: comment,
      postid: postID,
      uid: currentUserID,
      createdAt: new Date(), // Added timestamp
    };

    button.innerHTML = "sending...";
    button.disabled = true;

    try {
      const commentRef = collection(db, "comments");
      await addDoc(commentRef, commentObj);
      button.innerHTML = "send";
      button.disabled = false;
      toast.success("Comment Added");
    } catch (error) {
      button.innerHTML = "send";
      button.disabled = false;
      console.log(error.message);
    }

    e.target[0].value = "";
  };

  return (
    <div className="comments">
      {userData?.map((data, ind) => {
        if (data.uid === currentUserID) {
          return (
            <div key={ind} className="writebox">
              <form onSubmit={addComments}>
                <div className="user">
                  <img
                    src={data?.profileImg ? data.profileImg : userLogo}
                    alt=""
                  />
                  <input type="text" placeholder="Write a comment..." />
                  <button type="submit" className="btn btn-primary">
                    Send
                  </button>
                </div>
              </form>
            </div>
          );
        }
      })}

      {comments.map((commentData, ind) => {
        const commentDate = commentData.createdAt
          ? new Date(commentData.createdAt.seconds * 1000)
          : new Date();

        const user = userData.find((user) => user.uid === commentData.uid);

        return (
          <Link key={ind} to={`/profile/${commentData.uid}`}>
            <div className="user">
              <img
                src={user?.profileImg ? user.profileImg : userLogo}
                alt=""
              />
              <div>
                <h5>{user?.fullName || "Unknown User"}</h5>
                <p>{commentData.comment}</p>
              </div>
              <small>{dayjs().to(commentDate)}</small>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Comments;
