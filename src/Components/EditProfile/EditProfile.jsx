import { toast } from "react-toastify";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import "./EditProfile.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const editUserProfile = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const username = e.target[1].value;
    const bio = e.target[2].value;
    const profileImg = e.target[3].files[0];
    const bgImg = e.target[4].files[0];
    const button = e.target[5];
    const userID = auth.currentUser.uid;

    const editProfileObj = {
      fullName: fullName,
      username: username,
      bio: bio,
      profileImg: null,
      bgImg: null,
    };

    button.innerHTML = "Uploading...";
    button.disabled = true;
    try {
      if (profileImg) {
        // Upload profile image
        const profileImgRef = ref(storageDB, `profileImg/${profileImg.name}`);
        const profileSnapshot = await uploadBytes(profileImgRef, profileImg);
        const profileImgUrl = await getDownloadURL(profileSnapshot.ref);
        editProfileObj.profileImg = profileImgUrl;
        // Update user profile in all posts
        const postQuery = query(
          collection(db, "posts"),
          where("uid", "==", userID)
        );
        const querySnapshot = await getDocs(postQuery);
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
          const postRef = doc.ref;
          batch.update(postRef, {
            userImg: profileImgUrl,
            username: fullName,
          });
        });

        await batch.commit();
      }

      if (bgImg) {
        // Upload background image
        const bgImgRef = ref(storageDB, `bgImg/${bgImg.name}`);
        const bgSnapshot = await uploadBytes(bgImgRef, bgImg);
        const bgImgUrl = await getDownloadURL(bgSnapshot.ref);
        editProfileObj.bgImg = bgImgUrl;
      }

      // Now update the document with both image URLs
      const userRef = doc(db, "users", userID);
      await updateDoc(userRef, editProfileObj);
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
      button.innerHTML = "Upload Profile";
      button.disabled = false;
      toast.success("Profile updated successfully!");
      navigate("/profile/id");
    } catch (error) {
      toast.error(error.message);
      button.innerHTML = "Upload Profile";
      button.disabled = false;
    }
  };

  return (
    <div className="edit-profile-container">
      <form onSubmit={editUserProfile} className="edit-form">
        <h1>Edit Profile</h1>
        <div className="input-box">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Name" />
        </div>
        <div className="input-box">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
        </div>
        <div className="input-box">
          <label htmlFor="bio">Bio</label>
          <input type="text" id="bio" placeholder="Bio" />
        </div>
        <div className="input-box">
          <label htmlFor="profile">Profile Image</label>
          <input type="file" id="profile" required accept="image/*" />
        </div>
        <div className="input-box">
          <label htmlFor="background">Background Image</label>
          <input type="file" id="background" required accept="image/*" />
        </div>
        <div className="button-box">
          <div className="skip" onClick={() => navigate("/")}>
            Skip
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
