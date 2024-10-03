// Components.................
import AddPost from "../../Components/AddPost/AddPost";
import Feeds from "../../Components/Feeds/Feeds";
import Stories from "../../Components/Stories/Stories";

const HomePage = () => {
  return (
    <>
      <Stories />
      <AddPost />
      <Feeds/>
    </>
  );
};

export default HomePage;
