
// Components............
import AddPost from "../../Components/AddPost/AddPost";
import UserProfile from "../../Components/userProfile/UserProfile";
import Feeds from "../../Components/Feeds/Feeds";

const Profile = () => {
  return (
    <>
      <UserProfile />
      <AddPost />
      <Feeds />
    </>
  );
};

export default Profile;
