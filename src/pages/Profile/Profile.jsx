
// Components............
import AddPost from "../../Components/AddPost/AddPost";
import UserProfile from "../../Components/userProfile/UserProfile";
import ProfileFeeds from "../../Components/ProfileFeed/ProfileFeeds";

const Profile = () => {
  return (
    <>
      <UserProfile />
      <AddPost />
      <ProfileFeeds />
    </>
  );
};

export default Profile;
