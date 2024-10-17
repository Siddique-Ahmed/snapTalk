import "./addpost.css";
import usericon from "../../../public/img/user-dp.jpeg";

// FontAwesome Icon..................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddPost = () => {
  const [data, setData] = useState([]);
  const userID = auth.currentUser.uid;

  //Get USer Data From Firebase //
  useEffect(() => {
    const getUserDataFromFirebase = async () => {
      const docRef = doc(db, "users", userID);
      const dataArr = [];
      await getDoc(docRef).then((data) => {
        dataArr.push(data.data());
        setData(dataArr);
      });
    };

    getUserDataFromFirebase();
  }, []);

  const AddPostDataInFirebaseDB = async (e) => {
    e.preventDefault();
    const postTitle = e.target[0].value;
    const postBtn = e.target[1];
    const postImg = e.target[2].files[0];
    const postVideo = e.target[3].files[0];
    const sizeFor5MB = 5 * 1024 * 1024;
    const sizeFor1MB = 1 * 1024 * 1024;

    const postObj = {
      title: postTitle,
      postImg: null,
      postVideo: null,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid,
      likes: [],
      likesCount: 0,
    };


    postBtn.innerHTML = "Posting..."
    postBtn.disabled = true;
    try {
      if (postVideo && postVideo.size > sizeFor5MB) {
        return toast.error("video will be 5MB");
      } else {
        const postVideoRef = ref(storageDB, `postVideo/${postVideo.name}`);
        const profileSnapshot = await uploadBytes(postVideoRef, postVideo);
        const postVideoUrl = await getDownloadURL(profileSnapshot.ref);
        postObj.postVideo = postVideoUrl;
      }

      if (postImg && postImg.size > sizeFor1MB) {
        return toast.error("Image will be 1MB");
      } else {
        const postImgRef = ref(storageDB, `postImg/${postImg.name}`);
        const profileSnapshot = await uploadBytes(postImgRef, postImg);
        const postImgUrl = await getDownloadURL(profileSnapshot.ref);
        postObj.postImg = postImgUrl;
      }

      // add post data in firebase db //
      const postRef = collection(db,"post");
      await addDoc(postRef , postObj);
      postBtn.innerHTML = "Post"
      postBtn.disabled = false;
      toast.success("posted!!");
    } catch (error) {
      toast.error(error.message);
    }

    e.target[0].value = ""

  };

  return (
    <form
      onSubmit={(e) => {
        AddPostDataInFirebaseDB(e);
      }}
      className="postForm"
    >
      {data.map((user, ind) => {
        return (
          <div key={ind} className="user form-top">
            <img src={user.profileImg ? user.profileImg : usericon} alt="" />
            <input type="text" placeholder="What's on your mind?" required />
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </div>
        );
      })}
      <div className="post-categories">
        <label htmlFor="img">
          <input type="file" id="img" accept="image/*" />
          <span>
            <FontAwesomeIcon icon={faImage} /> Photos
          </span>
        </label>
        <label htmlFor="video">
          <input type="file" id="video" accept="video/*" />
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
