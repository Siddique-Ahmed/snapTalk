import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import { toast } from "react-toastify";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const [existUsername, setExistUsername] = useState("");
  const [existBio, setExistBio] = useState("");
  const [existFullName, setExistFullName] = useState("");
  const navigate = useNavigate();

  // getDataFromFirebase //
  useEffect(() => {
    const getDataFromFirebase = async () => {
      const userRef = doc(db, "users", auth.currentUser.uid);
      try {
        const getData = await getDoc(userRef);
        setExistUsername(getData.data().username);
        setExistBio(getData.data().bio);
        setExistFullName(getData.data().fullName);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataFromFirebase();
  }, [existUsername]);

  const editUserProfile = (e) => {
    e.preventDefault();
    console.log(existUsername);
    const fullName = e.target[0].value;
    const username = e.target[1].value;
    const bio = e.target[2].value;
    const userProfile = e.target[3].files[0].name;
    const userBackgroundImg = e.target[4].files[0].name;
    const updateButton = e.target[5];

    const userEditData = {
      fullName:
        fullName.trim() !== "" && fullName !== existFullName
          ? fullName
          : existFullName,
      username:
        username.trim() !== "" && username !== existUsername
          ? username
          : existUsername,
      bio: bio.trim() !== "" && bio !== existBio ? bio : existBio,
      userProfile: "",
      userBackgroundImg: "",
    };
    updateButton.innerHTML = "Uploading...";
    updateButton.disabled = true;
    const userBGRef = ref(storageDB, `bgImages/${userProfile}`);
    try {
      uploadBytes(userBGRef, e.target[3].files[0].name).then(() => {
        getDownloadURL(userBGRef).then((url) => {
          userEditData.userProfile = url;
          const userProfileRef = ref(
            storageDB,
            `profileImages/${userBackgroundImg}`
          );
          try {
            uploadBytes(userProfileRef, e.target[4].files[0].name).then(() => {
              getDownloadURL(userProfileRef).then((url) => {
                userEditData.userBackgroundImg = url;
                addEditDataToDB();
              });
            });
          } catch (error) {
            toast.error(error.message);
            updateButton.innerHTML = "uploade Profile";
            updateButton.disabled = false;
          }
        });
      });
    } catch (error) {
      toast.error(error.message);
      updateButton.innerHTML = "upload Profile";
      updateButton.disabled = false;
    }

    // add edit profile data in firebase db //
    const addEditDataToDB = async () => {
      toast.success("Profile Updated");
      updateButton.innerHTML = "Upload Profile";
      updateButton.disabled = false;
      navigate("/");
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, userEditData);
    };
  };

  return (
    <div className="edit-profile-container">
      <form onSubmit={(e) => editUserProfile(e)} className="edit-form">
        <h1>Edit Profile</h1>
        <div className="input-box">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Name"  />
        </div>
        <div className="input-box">
          <label htmlFor="username">username</label>
          <input type="text" id="username" placeholder="username" />
        </div>
        <div className="input-box">
          <label htmlFor="bio">Bio</label>
          <input type="text" id="bio" placeholder="Bio" />
        </div>
        <div className="input-box">
          <label htmlFor="profile">Profile Image</label>
          <input type="file" id="profile" required />
        </div>
        <div className="input-box">
          <label htmlFor="background">Background Image</label>
          <input type="file" id="background" required />
        </div>
        <div className="button-box">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="skip"
          >
            Skip
          </div>
          <button type="submit" className="btn btn-primary">
            Updat Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
