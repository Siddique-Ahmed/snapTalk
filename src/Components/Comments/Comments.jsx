import "./comments.css";
import { Link } from "react-router-dom";

const Comments = () => {
  return (
    <div className="comments">
      <div className="writebox">
        <form action="#">
          <div className="user">
            <img
              src="https://images.unsplash.com/photo-1517630800677-932d836ab680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <input type="text" placeholder="Write a comment..." />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
      {CommentData.map((comment) => (
        <Link to={"/profile/id"}>
          <div className="user" key={comment.id}>
            <img
              src="https://images.unsplash.com/photo-1517630800677-932d836ab680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
            <div>
            <h5>{comment.name}</h5>
            <p>{comment.CommeText}</p>
            </div>
          <small>1h</small>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
