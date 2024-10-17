import "./comments.css";
import { Link } from "react-router-dom";
import userLogo from "../../../public/img/user-dp.jpeg"

const Comments = () => {
  return (
    <div className="comments">
      <div className="writebox">
        <form action="#">
          <div className="user">
            <img
              src={userLogo}
              alt=""
            />
            <input type="text" placeholder="Write a comment..." />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
        <Link to={"/profile/id"}>
          <div className="user" >
            <img
              src={userLogo}
              alt=""
            />
            <div>
            <h5>Siddique</h5>
            <p>nice pic</p>
            </div>
          <small>1h</small>
          </div>
        </Link>
    </div>
  );
};

export default Comments;
