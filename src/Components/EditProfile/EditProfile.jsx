import { toast } from "react-toastify";
import { auth, db, storageDB } from "../../firebaseConfig/Firebase";
import "./EditProfile.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const EditProfile = () => {
  const editUserProfile = async (e) => {
    e.preventDefault();

    const fullName = e.target[0].value;
    const username = e.target[1].value;
    const bio = e.target[2].value;
    const profileImg = e.target[3].files[0];
    const bgImg = e.target[4].files[0];
    const userID = auth.currentUser.uid;

    const editProfileObj = {
      fullName: fullName,
      username: username,
      bio: bio,
      profileImg: null,
      bgImg: null,
    };

    try {
      if (profileImg) {
        // Upload profile image
        const profileImgRef = ref(storageDB, `profileImg/${profileImg.name}`);
        const profileSnapshot = await uploadBytes(profileImgRef, profileImg);
        const profileImgUrl = await getDownloadURL(profileSnapshot.ref);
        editProfileObj.profileImg = profileImgUrl;
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

      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message);
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
