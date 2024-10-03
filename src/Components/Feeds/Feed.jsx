import "./feeds.css";
import { Link } from "react-router-dom";

// Components...............
import Comments from "../Comments/Comments";

// FontAwesome Icons...............
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faListDots,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

// States............
import { useState } from "react";

const Feed = ({ fed }) => {
  // States Discuse..............
  let [openComment, setOpenComment] = useState(false);

  const commentHandler = () => {
    setOpenComment(!openComment);
  };

  return (
    <div className="feed" key={fed.id}>
      <div className="top-content">
        <Link to={"/profile/id"}>
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1517630800677-932d836ab680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <div>
              <h5>{fed.name}</h5>
              <small>1 Minute Ago</small>
            </div>
          </div>
        </Link>
        <span>
          <FontAwesomeIcon icon={faListDots} />
        </span>
      </div>
      <div className="mid-content">
        <p>{fed.decs}</p>
        <img
          src="https://images.unsplash.com/photo-1517630800677-932d836ab680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>
      <div className="bottom-content">
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faHeart} /> 14 Like
          </span>
        </div>
        <div className="action-item" onClick={commentHandler}>
          <span>
            <FontAwesomeIcon icon={faComment} /> 23 Comment
          </span>
        </div>
        <div className="action-item">
          <span>
            <FontAwesomeIcon icon={faShare} /> 2 Share
          </span>
        </div>
      </div>
      {openComment && <Comments />}
    </div>
  );
};

export default Feed;
