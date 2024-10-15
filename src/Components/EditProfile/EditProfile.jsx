import "./EditProfile.css";

const EditProfile = () => {
  return (
    <div className="edit-profile-container">
      <form className="edit-form">
        <h1>Edit Profile</h1>
        <div className="input-box">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Name" />
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
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
