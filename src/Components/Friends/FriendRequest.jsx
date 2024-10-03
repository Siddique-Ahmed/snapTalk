import "./friendRequest.css";
import { Link } from "react-router-dom";

// FakeApis..........
import Friends from "../../FackApis/FriendReqData";

const FriendRequest = () => {
  return (
    <div className="friend-requests">
      <h4>Friend Request</h4>
      {Friends.map((friend) => (
        <div className="request">
          <Link to={"/profile/id"}>
            <div className="info" key={friend.id}>
              <div className="user">
                <img
                  src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
                <h5>{friend.name}</h5>
              </div>
              <div className="info-name">
                <p>{friend.info}</p>
              </div>
            </div>
          </Link>

          <div className="action">
            <button className="btn btn-primary">Accept</button>
            <button className="btn btn-red">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
