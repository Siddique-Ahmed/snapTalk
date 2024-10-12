import "./addpost.css";
import usericon from "../../../public/img/user-dp.jpeg";

// Firebase Data..................
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// FontAwesome Icon..................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddPost = () => {
  const [data, setData] = useState(null);

  // get data for profile picture from firebase
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

  const addPostInFirebase = async (e) => {
    e.preventDefault();

    const postTitle = e.target[0].value;
    const postButton = e.target[1];
    const postImage = e.target[2].files[0];
    const postVideo = e.target[3].files[0];
    const bytes = 5 * 1024 * 1024;

    let setImg = null;
    let setVideo = null;
    postButton.innerHTML = "posting...";
    postButton.disabled = true;
    // Check if video is provided, and validate
    if (postVideo) {
      if (postVideo.type.startsWith("video/") && postVideo.size <= bytes) {
        setVideo = postVideo;
        toast.success("Video uploaded");
      } else {
        toast.error("Invalid video. It must be less than 5MB.");
        return;
      }
    }

    // Check if image is provided, and validate
    if (postImage) {
      if (postImage.type.startsWith("image/")) {
        setImg = postImage;
        toast.success("Image uploaded");
      } else {
        toast.error("Invalid image.");
        return;
      }
    }
    if (!postTitle.trim()) {
      toast.error("Please add some text to your post.");
      return;
    }

    // Create post object
    const postObj = {
      title: postTitle,
      img: null,
      video: null,
      postTime: serverTimestamp(),
      userId: auth.currentUser.uid,
      userProfile: data.userProfile,
      fullName: data.fullName,
      
    };

    try {
      const addDataInFirebaseStorage = async () => {
        if (setImg) {
          const imgRef = ref(storageDB, `postImg/${setImg.name}`);
          await uploadBytes(imgRef, setImg);
          const imgUrl = await getDownloadURL(imgRef);
          postObj.img = imgUrl;
        }

        if (setVideo) {
          const videoRef = ref(storageDB, `postVideo/${setVideo.name}`);
          await uploadBytes(videoRef, setVideo);
          const videoUrl = await getDownloadURL(videoRef);
          postObj.video = videoUrl;
        }
      };

      await addDataInFirebaseStorage();

      // Add post to Firestore database
      await addDoc(collection(db, "posts"), postObj);
      postButton.innerHTML = "post";
      postButton.disabled = false;
      toast.success("Post added successfully!");
    } catch (error) {
      toast.error("Error uploading post: " + error.message);
    }

    // Clear the input fields
    e.target.reset();
  };

  return (
    <form onSubmit={(e) => addPostInFirebase(e)} className="postForm">
      <div className="user form-top">
        <img src={data?.userProfile ? data.userProfile : usericon} alt="" />
        <input type="text" placeholder="What's on your mind?" required />
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </div>
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
