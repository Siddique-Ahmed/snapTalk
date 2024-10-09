import "./addpost.css";

// Firebase Data..................
import { auth, db } from "../../firebaseConfig/Firebase";

// FontAwesome Icon..................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const AddPost = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getDataFromFirebase = async () => {
      if (!auth.currentUser) {
        return;
      }
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setData(userDoc.data());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    getDataFromFirebase();
  }, []);

  return (
    <form className="postForm">
      <div className="user form-top">
        <img src={data ? data.userProfile : ""} alt="" />
        <input type="text" placeholder="What's on your mind?" required />
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </div>
      <div className="post-categories">
        <label htmlFor="img">
          <input type="file" id="img" />
          <span>
            <FontAwesomeIcon icon={faImage} /> Photos
          </span>
        </label>
        <label htmlFor="video">
          <input type="file" id="video" />
          <span>
            <FontAwesomeIcon icon={faVideo} /> Videos
          </span>
        </label>
        <span>
          <FontAwesomeIcon icon={faTags} /> Tags
        </span>
        <span>
          <FontAwesomeIcon icon={faSmile} /> Feelings
        </span>
      </div>
    </form>
  );
};

export default AddPost;
