// Components............
import AddPost from "../../Components/AddPost/AddPost";
import OtherUserProfile from "../../Components/OtherUserProfile/OtherUserProfile";
import OtherProfileFeeds from "../../Components/OtherUserFeeds/OtherProfileFeeds";

const Profile = () => {
  return (
    <>
      <OtherUserProfile />
      <OtherProfileFeeds />
    </>
  );
};

export default Profile;
