import "./addpost.css";

// Firebase Data..................
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";

// FontAwesome Icon..................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faSmile,
  faTags,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

const AddPost = () => {
  // Post adding data
  const addPostData = async (e) => {
    e.preventDefault();

    const docRef4User = doc(db, "users", auth.currentUser.uid);
    const getted = getDoc(docRef4User);
    console.log("getted");

    const userPostObj = {
      postTitle: e.target[0].value,
      postphoto: "",
      postvideo: "",
      time: Timestamp.now(),
      uid: auth.currentUser.uid,
    };

    const imgFile = e.target[2].files[0];
    const videoFile = e.target[3].files[0];

    if (imgFile || videoFile) {
      // Image upload condition
      if (imgFile) {
        const imgRef = ref(storageDB, `images/${imgFile.name}`);
        e.target[1].innerHTML = "Posting...";
        e.target[1].disabled = true;
        try {
          await uploadBytes(imgRef, imgFile);
          userPostObj.postphoto = await getDownloadURL(imgRef);
        } catch (error) {
          e.target[1].innerHTML = "Post";
          e.target[1].disabled = false;
          console.log("Image upload error:", error.message);
        }
      }

      // Video upload condition
      if (videoFile) {
        const videoRef = ref(storageDB, `videos/${videoFile.name}`);
        e.target[1].innerHTML = "Posting...";
        e.target[1].disabled = true;
        try {
          await uploadBytes(videoRef, videoFile);
          userPostObj.postvideo = await getDownloadURL(videoRef);
        } catch (error) {
          e.target[1].innerHTML = "Post";
          e.target[1].disabled = false;
          console.log("Video upload error:", error.message);
        }
      }
    }
    const addPostDataOnDB = async () => {
      console.log(userPostObj);
      const postRef = collection(db, "posts");

      try {
        const post = await addDoc(postRef, userPostObj);
        console.log("Post added:", post);
      } catch (error) {
        e.target[1].innerHTML = "Post";
        e.target[1].disabled = false;
        console.log("Error adding post:", error.message);
      }
    };

    await addPostDataOnDB();

    e.target[0].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[1].innerHTML = "Post";
    e.target[1].disabled = false;
  };

  return (
    <form onSubmit={addPostData} className="postForm">
      <div className="user form-top">
        <img src="" alt="" />
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
