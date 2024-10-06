import "./addpost.css";

// FakeApis..................
import CurrentUser from "../../FackApis/CurrentUserData";

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
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const AddPost = () => {
  // Post adding data
  const addPostData = async (e) => {
    e.preventDefault();

    const userPostObj = {
      postTitle: e.target[0].value,
      postphoto: "",
      postvideo: "",
      time: Timestamp.now(),
    };

    const imgFile = e.target[2].files[0];
    const videoFile = e.target[3].files[0];

    if (imgFile || videoFile) {
      // Image upload condition
      if (imgFile) {
        const imgRef = ref(storageDB, "images/" + imgFile.name);
        try {
          await uploadBytes(imgRef, imgFile);
          userPostObj.postphoto = await getDownloadURL(imgRef);
        } catch (error) {
          console.log("Image upload error:", error.message);
        }
      }

      // Video upload condition
      if (videoFile) {
        const videoRef = ref(storageDB, "videos/" + videoFile.name);
        try {
          await uploadBytes(videoRef, videoFile);
          userPostObj.postvideo = await getDownloadURL(videoRef);
        } catch (error) {
          console.log("Video upload error:", error.message);
        }
      }
    } else {
      console.log("No files selected. Only post title will be saved.");
    }

    const addPostDataOnDB = async () => {
      console.log(userPostObj);
      const postRef = collection(db, "posts");

      try {
        const post = await addDoc(postRef, userPostObj);
        console.log("Post added:", post);
      } catch (error) {
        console.log("Error adding post:", error.message);
      }
    };

    await addPostDataOnDB();

    e.target[0].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
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
