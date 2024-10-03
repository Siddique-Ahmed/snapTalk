import "./addpost.css";

// FakeApis..................
import CurrentUser from "../../FackApis/CurrentUserData";

// FontAwesome Icon..................
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faSmile, faTags, faVideo } from "@fortawesome/free-solid-svg-icons";

const AddPost = () => {
  return (
    <form className="postForm">
      <div className="user form-top">
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
        <input type="text" placeholder="What's on your mind?" />
        <button type="submit" className="btn btn-primary">Post</button>
      </div>
      <div className="post-categories">
        <label htmlFor="file">
          <input type="file"  id="file"/>
          <span><FontAwesomeIcon icon={faImage}/> Photos</span>
        </label>
        <label htmlFor="file">
          <input type="file"  id="file"/>
          <span><FontAwesomeIcon icon={faVideo}/> Videos</span>
        </label>
        <span><FontAwesomeIcon icon={faTags}/> Tags</span>
        <span><FontAwesomeIcon icon={faSmile}/> Feelings</span>
      </div>
    </form>
  );
};

export default AddPost;
