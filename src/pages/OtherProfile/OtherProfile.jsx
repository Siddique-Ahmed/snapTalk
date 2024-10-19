// Components............
import AddPost from "../../Components/AddPost/AddPost";
import OtherUserProfile from "../../Components/OtherUserProfile/OtherUserProfile";
import OtherProfileFeeds from "../../Components/OtherUserFeeds/OtherProfileFeeds";
import { useParams } from "react-router-dom";

const Profile = () => {
  const {uid} = useParams();  

  return (
    <>
      <OtherUserProfile id={uid} />
      <OtherProfileFeeds id={uid} />
    </>
  );
};

export default Profile;
