import "./friendRequest.css";
import { Link } from "react-router-dom";
import userIcon from "../../../public/img/user-dp.jpeg";

const FriendRequest = () => {
  return (
    <div className="friend-requests">
      <h4>Friend Request</h4>
      <div className="request">
        <Link to={"/profile/id"}>
          <div className="info">
            <div className="user">
              <img
                src={userIcon}
                alt=""
              />
              <h5>Siddique</h5>
            </div>
            <div className="info-name">
              <p>2 mutual</p>
            </div>
          </div>
        </Link>

        <div className="action">
          <button className="btn btn-primary">Accept</button>
          <button className="btn btn-red">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
