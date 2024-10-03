import FriendRequest from "../Friends/FriendRequest";
import Message from "../Message/Message";

// Components...............
import "./rightBar.css";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="rightBar-container">
        <Message />
        <FriendRequest />
      </div>
    </div>
  );
};

export default RightBar;
