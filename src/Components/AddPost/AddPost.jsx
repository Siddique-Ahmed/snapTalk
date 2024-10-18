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
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddPost = () => {
  const [data, setData] = useState([]);
  const userID = auth.currentUser.uid;

  // Get User Data from Firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const currentUser = userData.find(user => user.id === userID);
      if (currentUser) {
        setData([currentUser]);
      }
    });
    return () => unsubscribe();
  }, [userID]);

  const AddPostDataInFirebaseDB = async (e) => {
    e.preventDefault();

    const postTitle = e.target[0].value;
    const postBtn = e.target[1];
    const postImg = e.target[2].files[0];
    const postVideo = e.target[3].files[0];

    const sizeFor5MB = 5 * 1024 * 1024;
    const sizeFor1MB = 1 * 1024 * 1024;

    postBtn.innerHTML = "Posting...";
    postBtn.disabled = true;

    const postObj = {
      title: postTitle,
      postImg: null,
      postVideo: null,
      createdAt: serverTimestamp(),
      uid: userID,
      likes: [],
      likesCount: 0,
      userImg: data[0]?.profileImg,
      username: data[0]?.fullName,
    };

    try {
      // Video size check and upload
      if (postVideo && postVideo.size > sizeFor5MB) {
        toast.error("Video must be smaller than 5MB");
        resetButton(postBtn);
        return;
      }

      // Image size check and upload
      if (postImg && postImg.size > sizeFor1MB) {
        toast.error("Image must be smaller than 1MB");
        resetButton(postBtn);
        return;
      }
      // Upload video if present
      if (postVideo) {
        const postVideoRef = ref(storageDB, `postVideo/${postVideo.name}`);
        const videoSnapshot = await uploadBytes(postVideoRef, postVideo);
        const postVideoUrl = await getDownloadURL(videoSnapshot.ref);
        postObj.postVideo = postVideoUrl;
      }
      // Upload image if present
      if (postImg) {
        const postImgRef = ref(storageDB, `postImg/${postImg.name}`);
        const imgSnapshot = await uploadBytes(postImgRef, postImg);
        const postImgUrl = await getDownloadURL(imgSnapshot.ref);
        postObj.postImg = postImgUrl;
      }
      // Add post data in Firestore
      await addDoc(collection(db, "posts"), postObj);
      toast.success("Post created successfully!");
      // Reset the form after successful post
      resetForm(e);
    } catch (error) {
      toast.error("Error posting: " + error.message);
    } finally {
      resetButton(postBtn);
    }
  };
  // Reset form inputs including file inputs
  const resetForm = (e) => {
    e.target[0].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
  };

  const resetButton = (btn) => {
    btn.innerHTML = "Post";
    btn.disabled = false;
  };

  return (
    <form onSubmit={AddPostDataInFirebaseDB} className="postForm">
      {data.map((user, ind) => (
        <div key={ind} className="user form-top">
          <img src={user.profileImg ? user.profileImg : usericon} alt="User" />
          <input type="text" placeholder="What's on your mind?" required />
          <button type="submit" className="btn btn-primary">
            Post
          </button>
        </div>
      ))}
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
